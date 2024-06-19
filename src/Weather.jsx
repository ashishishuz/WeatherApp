import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import {IoMdSunny,IoMdRainy,IoMdCloudy,IoMdSnow,IoMdThunderstorm, IoMdSearch} from 'react-icons/io'
import {BsCloudDrizzleFill,BsEye,BsWater,BsThermometer,BsWind,BsCloudHaze2Fill} from 'react-icons/bs'
import {TbTemperatureCelsius, TbTextColor} from 'react-icons/tb'
import {ImFeed, ImFinder, ImSearch, ImSpinner8, ImSpotify} from 'react-icons/im'

const APIkey ='ed31fe7b26593bf4d0a99cf1374f8a95' //api key


function Weather(){
    const[data,setData]=useState(null);
    const[location,setLocation]=useState('Jalandhar');
    const[input,setInput]=useState('');
    const[error, setError] = useState('');
    const[loading,setLoading]=useState(false)

    const handleinput= (e)=>{
        setInput(e.target.value);
    }

    // console.log(input);

    const submit=(e)=>{
      e.preventDefault();

        console.log(input);

        //if input is not empty
        if (input !== '') {
            setLocation(input);
            setInput('');
            setError('');
        }
        const check=document.querySelector('input');
        check.value='';
        
        // if(check.value.trim().length===0){
        //     alert("!Enter city/Country name")
        //     return;
        // }

        
       
    }



    //fetching data
    useEffect(()=>{
        setLoading(true);
        if (!location) return;
        setLoading(true);
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

      axios.get(url).then(res => {
        setTimeout(()=>{
            setData(res.data)
            setLoading(false);
            setError('');
        },1000)
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        setError('No such place exists. Please enter a valid city or country.');
        setLoading(false);
    });
}, [location]);

    //if data not exists/invalid
    if(!data){
        return(
        <div>
            <div>
                <ImSpinner8 className='text-5xl animate-spin' />
            </div>
        </div>
        );
    }
    

      
 //setting icon according to wether/temp

 let icon;
 console.log(data.weather[0].main)
 switch (data.weather[0].main){
    case 'Clouds':
        icon =<IoMdCloudy color='gray'/>;
        break;
    case 'Haze':
        icon =<BsCloudHaze2Fill color='light-gray'/>;
        break;
    case 'Rain':
        icon =<IoMdRainy color='darkblue'/>;
        break;
    case 'Clear':
        icon =<IoMdSunny color='yellow' />;
        break;
    case 'Drizzle':
        icon =<BsCloudDrizzleFill color='lightblue'/>;
        break;
    case 'Snow':
        icon =<IoMdSnow color='darkblue'/>;
        break;
    case 'Thunderstrom':
        icon =<IoMdThunderstorm color='darkgray'/>;
        break;
 }
//  date object
const  date=new Date();
 return(
    <>
    
    {/* <div>
        <h1>Raect App</h1>
        <div className='text-6xl'>{icon}</div>
    </div> */}
    {/* form */}
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
        {/* error message */}
    {error && (
            <div className="error-message">
                <p>{error}</p>
            </div>
        )}
        <form className= 'h-16 bg-black/30 w-full max-w-[450px] rounded-full blacdrop-blur-[32px] mb-8'>
            <div className=' h-full realtive flex items-center justify-between p-2'>
                <input onChange={(e)=>handleinput(e)}
                className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full'
                 type='text' placeholder='Search City or Country' pattern='[a-zA-Z]+' title='Invalid name: Please enter only letters (no numbers)'/>
                 <button onClick={submit} 
                  className='bg-[#1ab8cd] hover:bg-[#15adbb] w-20 h-12 rounded-full flex justify-center items-center transiction'>
                    <IoMdSearch  className='text-2xl text-white'/>
                 </button>
            </div>
        </form>



        {/* card */}
        <div className='w-full max-w-[450px] bg-black/30 min-h-[548px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        {/* Display loading spinner */}
        {loading && (
          <div className='w-full h-full flex justify-center items-center'>
            <ImSearch className='text-5xl animate-rotate text-black' />Fetching!<ImSpinner8 className='text-4xl animate-spin text-red' />
          </div>
        )}

        {/* Display error message */}

        {/* Display weather data */}
        {!loading && (
          <div>
            <div className='flex items-center flex-col gap-y-2'>
              {/* Weather icon */}
              <div className='text-[87px]'>{icon}</div>
              {/* Country name */}
              <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
              {/* Date */}
              <div className='text-lg'>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
            </div>
            <div className='my-20'>
              <div className='flex justify-center items-center'>
                <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
                <div className='text-4xl'>
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className='capitalize text-center'>{data.weather[0].description}</div>
            </div>
            <div className='max-w-[378px] mx-auto flex flex-col gap-y-2'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'><BsEye /></div>
                  <div>Visibility <span className='ml-2'>{data.visibility / 1000} km</span></div>
                </div>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'><BsThermometer /></div>
                  <div className='flex'>
                    Feels like <span className='flex ml-2'>{parseInt(data.main.feels_like)}</span> <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'><BsWater /></div>
                  <div>Humidity <span className='ml-2'>{data.main.humidity}%</span></div>
                </div>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[20px]'><BsWind /></div>
                  <div className='flex'>
                    Wind <span className='ml-2'>{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Weather;