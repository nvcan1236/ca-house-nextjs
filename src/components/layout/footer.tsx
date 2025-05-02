import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import Container from "./container"

const Footer = () => {
  return (
    <footer className=" bg-main-blue-s5 text-white py-4 ">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 py-6 font-thin text-sm items-end">
          <div className="flex items-center flex-col">
            <Image
              src="/logo.png"
              alt="logo"
              className="object-cover"
              height={80}
              width={80}
            />
            <b className="mt-4 inline-block">Motel search website</b>
          </div>

          <div className="">
            <Label className="text-main-yellow-t6 text-lg mb-2">
              Main features
            </Label>
            <ul>
              <li>Search with filter</li>
              <li>Search on Map </li>
              <li>Search through post</li>
              <li>Management system for admin</li>
            </ul>
          </div>

          <div className="">
            <ul>
              <li>Create and mânge motel</li>
              <li>Approve motel</li>
              <li>Chat realtime </li>
              <li>Login, register</li>
            </ul>
          </div>

          <div>
            <Label className="text-main-yellow-t6 text-lg mb-2">
              Technologies
            </Label>
            <ul>
              <li>Next.js</li>
              <li>ShadCnUI, TailwindCSS</li>
              <li>Zustand, React Query</li>
              <li>Java, SpringBoot</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Websocket</li>
              <li>FastAPI</li>
              <li>Amazon S3, Brevo</li>
              <li>Docker</li>
            </ul>
          </div>
        </div>

        <Separator className=" bg-main-blue-s2" />
        <div className="opacity-50 text-sm font-thin pt-4 text-center">
          <div>
            The design is inspired by{" "}
            <Link href={"https://www.airbnb.com/"}>airbnb.com</Link>
          </div>
          <div>
            Developed by{" "}
            <Link href={"https://github.com/nvcan1236"}>Nguyen Van Canh</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
