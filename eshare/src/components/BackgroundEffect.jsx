// import React from 'react';


// const BackgroundEffect = () => {
//   return (
//     <div className="absolute inset-0 bg-blue-100 h-full w-full flex items-center justify-center -z-10">
//       <div className="relative w-full h-full">
//         {/* Background Elements */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           {/* Crane */}
//           <div className="flex flex-col items-center">
//             <div className="bg-blue-500 w-16 h-16 rounded-t"></div>
//             <div className="bg-blue-400 w-2 h-24"></div>
//             <div className="bg-blue-300 w-12 h-12"></div>
//           </div>

//           {/* Mobile Device */}
//           <div className="relative flex flex-col items-center ml-16">
//             <div className="bg-purple-200 w-48 h-80 rounded-lg"></div>
//             <div className="absolute top-1/4 left-1/4 bg-white w-32 h-48 rounded-lg shadow-lg"></div>
//           </div>

//           {/* Gear and Robot Arm */}
//           <div className="flex items-center ml-16">
//             <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center">
//               <div className="bg-blue-500 w-8 h-8"></div>
//             </div>
//             <div className="bg-gray-400 w-16 h-32 flex items-center justify-center ml-4">
//               <div className="bg-gray-600 w-4 h-16"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BackgroundEffect;




//2nd




import React from 'react';
// import Footer from '../components/Footer';

const BackgroundEffect = () => {
  return (
    <div className="absolute inset-0 bg-blue-100 h-full w-full flex items-center justify-center -z-10">
      <div className="relative w-full h-full">
        {/* Background Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Crane */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 w-16 h-16 rounded-t"></div>
            <div className="bg-blue-400 w-2 h-24"></div>
            <div className="bg-blue-300 w-12 h-12"></div>
          </div>

          {/* Mobile Device */}
          <div className="relative flex flex-col items-center ml-16">
            <div className="bg-purple-200 w-48 h-80 rounded-lg"></div>
            <div className="absolute top-1/4 left-1/4 bg-white w-32 h-48 rounded-lg shadow-lg"></div>
          </div>

          {/* Gear and Robot Arm */}
          <div className="flex items-center ml-16">
            <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center">
              <div className="bg-blue-500 w-8 h-8"></div>
            </div>
            <div className="bg-gray-400 w-16 h-32 flex items-center justify-center ml-4">
              <div className="bg-gray-600 w-4 h-16"></div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundEffect;



