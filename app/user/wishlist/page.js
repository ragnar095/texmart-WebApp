"use client";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const page = () => {
  useEffect(() => {
    getData();
  }, []);

  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const docRef = doc(db, "users", "test");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      windows.alert("CREATE ACCOUNT");
    } else {
      const profile = docSnap.data();
      setWishlist(profile.wishlist);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-white text-center text-6xl">
        <div>LOADING...</div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-4xl flex flex-col gap-4 p-4 text-white">
      <p className="text-2xl">My Wishlist</p>
      <div className="flex flex-col bg-neutral-900 px-8 py-16 rounded-md">
        <div className="mx-auto">
        {wishlist.length == 0
          ? "WISHLIST EMPTY"
          : wishlist.map((p) => (
              <>
              <div className="flex">
                <div>
                  <img className="w-48 object-contain" src={p.thumbnail} />
                </div>
                <div className="space-y-4">
                  <p className="text-xl font-bold">{p.title}</p>
                  <div className="flex justify-between">
                    <div className="space-y-4">
                      <p className=" text-2xl font-black">₹{p.price}</p>
                      <p className="px-2 py-1 text-base font-black border rounded-md">{p.discount}% OFF</p>
                      <p>Added On</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <button className="font-bold border rounded-md py-2 px-4">Add to Cart</button>
                      <button className="font-bold border rounded-md py-2 px-4">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border border-neutral-800 my-4 px-4"/>
              </>
            ))}

        </div>
      </div>
    </div>
  );
};

export default page;
