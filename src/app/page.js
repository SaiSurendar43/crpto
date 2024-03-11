// Import necessary libraries and components
"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ScaleLoader } from "react-spinners";
import { useSpring, animated } from 'react-spring';

// Main component
export default function Home() {
  // State variables
  const [cryptoList, setCryptoList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [crypto1, setCrypto1] = useState("");
  const [crypto2, setCrypto2] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cryptoSearchQuery, setCryptoSearchQuery] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [selectedCryptoName1, setSelectedCryptoName1] = useState("");
  const [selectedCryptoName2, setSelectedCryptoName2] = useState("");
  const [animatedDropdown1, setAnimatedDropdown1] = useState(false);
  const [animatedDropdown2, setAnimatedDropdown2] = useState(false);

  const validationSchema = yup.object().shape({
    amount: yup.string().required('field is required')
  });

  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Fetch cryptocurrency list on component mount
  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/list"
        );
        console.log('response', response)
        const data = await response.json();
        setCryptoList(data);
      } catch (error) {
        console.error("Error fetching cryptocurrency list:", error);
      }
    };

    fetchCryptoList();
  }, []);

  // Filtered cryptocurrency list based on search query
  const filteredCryptoList = cryptoList.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered cryptocurrency list for the first input
  const filteredCrypto1List = cryptoList.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(cryptoSearchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(cryptoSearchQuery.toLowerCase())
  );

  // Animation configurations
  const dropdown1Animation = useSpring({
    opacity: animatedDropdown1 ? 4 : 0,
    height: animatedDropdown1 ? 200 : 0,
  });

  const dropdown2Animation = useSpring({
    opacity: animatedDropdown2 ? 4 : 0,
    height: animatedDropdown2 ? 200 : 0,
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle crypto search input change
  const handleCryptoSearchChange = (e) => {
    setCryptoSearchQuery(e.target.value);
  };

  // Toggle dropdown visibility for the first cryptocurrency
  const toggleDropdown1 = () => {
    setDropdown1(!dropdown1);
    setAnimatedDropdown1(!animatedDropdown1);
  };

  // Toggle dropdown visibility for the second cryptocurrency
  const toggleDropdown2 = () => {
    setDropdown2(!dropdown2);
    setAnimatedDropdown2(!animatedDropdown2);
  };

  const handleSelectCrypto1 = (crypto) => {
    setCrypto1(crypto.id);
    setSelectedCryptoName1(`${crypto.name} (${crypto.symbol.toUpperCase()})`);
    setDropdown1(false);
    setAnimatedDropdown1(false)
  };

  // Handle selection of the second cryptocurrency
  const handleSelectCrypto2 = (crypto) => {
    setCrypto2(crypto.id);
    setSelectedCryptoName2(`${crypto.name} (${crypto.symbol.toUpperCase()})`);
    setDropdown2(false);
    setAnimatedDropdown2(false)
  };

  // Handle swapping logic
  const handleSwap = async (formData) => {
    const { amount } = formData;

    setLoading(true);

    try {
      // Your API call using the extracted data...
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto1},${crypto2}&vs_currencies=usd`
      );

      const rate = response.data[crypto2].usd;
      setEstimatedAmount(amount * rate);
      setError(""); // Reset the error state on success
    } catch (error) {
      setError("Error fetching exchange rate");
    } finally {
      setLoading(false);
    }
  };

  // JSX structure
  return (
    <main className="shadow-md bg-customColor flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className=" shadow-md w-full md:w-1/2 p-6 bg-customColor2 rounded-xl">
        {/* You pay section */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-200"
          >
            You pay
          </label>
          <div className=" relative  mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500  sm:text-sm">$</span>
            </div>
            <input
              {...register("amount")}
              type="text"
              name="amount"
              className={`bg-customColor1 border ${
                errors?.amount ? "border-red-300" : "border-transparent"
              } h-36    w-full rounded-md  pl-7 flex items-center pr-20 placeholder:text-gray-400 text-gray-200 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6`}
              placeholder="0.00"
            />
            {errors?.amount && (
              <p className="text-red-500 font-medium">{errors.amount.message}</p>
            )}
            <div className="absolute inset-y-0 mr-2 right-0 flex items-center">
              {/* Dropdown for the first cryptocurrency */}
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={toggleDropdown1}
                  className="inline-flex justify-between items-center w-32 sm:w-34 lg:w-48 px-5 py-2 text-sm font-medium leading-5 text-gray-200 bg-customColor2 border-transparent rounded-2xl shadow-sm hover:bg-zinc-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-zinc-500 active:text-gray-200 transition ease-in-out duration-150 transform hover:scale-105"
                >
                  {selectedCryptoName1 || "Select a cryptocurrency"}
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* Dropdown panel */}
                <animated.div
                  style={dropdown1Animation}
                  className={`absolute -right-1 -top-28 overflow-scroll border-transparent overflow-x-hidden h-56 mt-2 w-72 bg-customColor1 border border-gray-300 rounded-t-2xl shadow-md`}
                >
                  {/* Search input bar */}
                  <div className="flex">
                    <h1 className="border-transparent w-full text-gray-200 px-0 py-0 mx-1">Select a token</h1>
                    <button
                      type="button"
                      onClick={toggleDropdown1}
                      className="inline-flex justify-between items-center w-20 ml-24 px-1 py-1 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-800 transition ease-in-out duration-150 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5 ml-2 mr-1 cursor-pointer text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border-hidden sticky top-0 text-gray-200  bg-customColor2 border-transparent rounded-full border-gray-300 focus:outline-none"
                    placeholder="Search..."
                    value={cryptoSearchQuery}
                    onChange={handleCryptoSearchChange}
                  />

                  {/* Dropdown options */}
                  <ul className="py-1">
                    {filteredCrypto1List.map((crypto) => (
                      <li
                        key={crypto.id}
                        className="px-4 py-2 text-sm leading-5 text-gray-400 cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSelectCrypto1(crypto)}
                      >
                        {crypto.name} ({crypto.symbol.toUpperCase()})
                      </li>
                    ))}
                  </ul>
                </animated.div>
              </div>
            </div>
          </div>
        </div>

        {/* You receive section */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-200"
          >
            You receive
          </label>
          <div className=" relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              value={estimatedAmount}
              className="bg-customColor1 border border-transparent h-36  w-full rounded-md py-1.5 pl-7 pr-20 placeholder:text-gray-400 text-gray-200 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6 text-sm"
              placeholder="0.00"
            />
            <div className="absolute mr-2 inset-y-0 right-0 flex items-center">

              <div className="relative inline-block  text-left">
                <button
                  type="button"
                  onClick={toggleDropdown2}
                  className="inline-flex justify-between items-center w-32 sm:w-34 lg:w-48 px-5 py-2 text-sm font-medium leading-5 text-gray-200 bg-customColor2 border-transparent rounded-2xl shadow-sm hover:bg-zinc-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-zinc-500 active:text-gray-200 transition ease-in-out duration-150 transform hover:scale-105"
                >
                  {selectedCryptoName2 || "Select a cryptocurrency"}
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                <animated.div
                  style={dropdown2Animation}
                  className={`absolute -right-1 -top-20 overflow-scroll border-transparent overflow-x-hidden h-56 mt-2 w-72 bg-customColor1 border border-gray-300 rounded-t-2xl shadow-md`}
                >
                  <div className="flex">
                    <h1 className="border-transparent w-full  px-0 py-0 mx-1">Select a token</h1>
                    <button
                      type="button"
                      onClick={toggleDropdown2}
                      className="inline-flex justify-between items-center w-20 ml-24 px-1 py-1 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-800 transition ease-in-out duration-150 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5 ml-2 -mr-1 cursor-pointer text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border-hidden sticky top-0  bg-customColor2 border-transparent rounded-full border-gray-300 focus:outline-none"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />

                  <ul className="py-1">
                    {filteredCryptoList.map((crypto) => (
                      <li
                        key={crypto.id}
                        className="px-4 py-2 text-sm leading-5 text-gray-400 cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSelectCrypto2(crypto)}
                      >
                        {crypto.name} ({crypto.symbol.toUpperCase()})
                      </li>
                    ))}
                  </ul>
                </animated.div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-200">${estimatedAmount}</p>
        {/* Swap button */}
        <button
          onClick={handleSubmit(handleSwap)}
          disabled={isValid && loading && isDirty}
          className="bg-cyan-700 hover:bg-indigo-600 w-full text-white font-bold my-2 mx-auto py-2 px-4 rounded focus:outline-none shadow-md"
        >
          {loading ? (
            <ScaleLoader color="#fff" height={15} width={2} radius={1} margin={2} />
          ) : (
            "Swap"
          )}
        </button>
        {error && <p className="mt-2 text-red-500 font-medium">{error}</p>}
      </div>
    </main>
  );
}
