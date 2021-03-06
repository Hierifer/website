import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import World from '../public/world.svg'

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen overflow-hidden absolute top-0 left-0">
      <div className="absolute flex flex-col top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-4xl z-20">
        <div className="mb-4 tracking-wider text-gray-800">创意源于热爱</div>
        <div className="font-light mb-4">Inspiration from Love</div>
        <div className="flex" style={{marginLeft: '2px'}}>
          <div className='bg-blue-300 w-3 rounded-sm h-3 mr-2' />
          <div className='bg-orange-300 w-3 rounded-sm h-3 mr-2' />
          <div className='bg-red-300 w-3 rounded-sm h-3' />
        </div>
      </div>
      <div className="whole h-full" id="map" style={{width:'200%', display: 'flex'}}>
        <World className="w-full world pl-2" />
        <World className="w-full world pl-2" />
      </div>

      <style jsx>{`
        @keyframes example {
          0%   {transform: translateX(-50%)}
          100% {transform: translateX(0%)}
        }

        .whole {
          animation-name: example;
          animation-duration: 30s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          position: absolute;
        }
        #map:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          background: white;
          z-index: 10;
          width:100%;
          height: 100%;
          opacity: 0.7;
        }
        .hoveritem {
          position: absolute;
          background: black;
          color: white;
          z-index: 100;
        }
      `}</style>
    </div>
  )
}

export default Home
