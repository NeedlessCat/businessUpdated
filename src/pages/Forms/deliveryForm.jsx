import Layout from "../../components/Layout/layout";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/firebaseConfig";

import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const DeliveryForm = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    amount: "",
    role: "delivery",
  });

  /**========================================================================
   *                          User Signup Function
   *========================================================================**/

  const userDetailsFunction = async () => {
    // validation
    if (
      userDetails.name.trim() === "" ||
      userDetails.email.trim() === "" ||
      userDetails.mobile.trim() === "" ||
      userDetails.amount.trim() === ""
    ) {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      // create user object
      const user = {
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
        amount: userDetails.amount,
        mobile: userDetails.mobile,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // create user Refrence
      const userRefrence = collection(fireDB, "deliveryForms");

      // Add User Detail
      addDoc(userRefrence, user);

      setUserDetails({
        name: "",
        email: "",
        mobile: "",
        amount: "",
      });

      toast.success("Payment Successful. Check Email for Receipt.");

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Donation Form
          </h1>
          {loading && <Loader />}
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Fill the details correctly in form
              </h2>
              <div className="login_Form bg-pink-50 md:px-8 md:py-6 px-4 py-4 border border-pink-100 rounded-xl shadow-md">
                {/* Input One  */}
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userDetails.name}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        name: e.target.value,
                      });
                    }}
                    className="bg-pink-50 border border-pink-200 px-2 py-2 w-full sm:w-96  rounded-md outline-none placeholder-pink-200"
                  />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userDetails.email}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        email: e.target.value,
                      });
                    }}
                    className="bg-pink-50 border border-pink-200 px-2 py-2 w-full sm:w-96  rounded-md outline-none placeholder-pink-200"
                  />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                  <input
                    type="number"
                    placeholder="Mobile"
                    value={userDetails.mobile}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        mobile: e.target.value,
                      });
                    }}
                    className="bg-pink-50 border border-pink-200 px-2 py-2 w-full sm:w-96 rounded-md outline-none placeholder-pink-200"
                  />
                </div>
              </div>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-md  text-gray-800 font-bold">
                      Enter Amount
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      <input
                        type="number"
                        placeholder="Amount in INR"
                        value={userDetails.amount}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            amount: e.target.value,
                          });
                        }}
                        className="bg-pink-50 border border-pink-200 px-2 py-2 w-30  rounded-md outline-none placeholder-pink-200"
                      />
                    </dd>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-sm text-gray-800">
                      <span>Offer</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">
                      - ₹ 0
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Additional Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">None</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {userDetails.amount}
                    </dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      onClick={userDetailsFunction}
                      className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryForm;
