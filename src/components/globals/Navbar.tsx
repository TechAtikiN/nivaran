"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from './Container';
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-transparen z-10 shadow-md">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <h1 className="text-2xl font-bold text-[#00252e] font-Poppins">
              {" "}
              Nivaran.{" "}
            </h1>
            <div className="flex gap-4 items-center">
              <div className="rounded-full px-3 py-2 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 hover:shadow-md">
                <Link
                  href="/login"
                  className="text-sm text-indigo-600 flex gap-2  items-center font-semibold"
                >
                  Signin <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
