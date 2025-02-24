"use client";
import Email from "@/components/Email";
import axios from "axios";
import { useEffect} from "react";

export default function Home() {
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4040/user");
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
    <Email />
  </div>

  );
}
