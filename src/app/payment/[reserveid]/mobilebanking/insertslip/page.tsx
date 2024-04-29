'use client'

import { useEffect, useState } from "react"
import ReviewTags from "@/components/ReviewTags";
import SearchTags from "@/components/SearchTags";
import User from "@/components/User";
import { Tags } from "interfaces";
import { Select, MenuItem, colors } from "@mui/material";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ReviewCard from "@/components/ReviewCard";
import InsertSlipBox from "@/components/InsertSlipBox";


export default function testComponent({params}:{params:{reserveid:string}}){

    

    return(
        <main>

            <InsertSlipBox reserve={params.reserveid}/>
            
        </main>
        
    )
}