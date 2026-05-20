export default function PopularRoutes({
  large = false,
  image = "/pr1.jpg",
  city = "New York",
  price = "$24",
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] group cursor-pointer ${
        large ? "h-[560px]" : "h-[270px]"
      }`}
    >
    
      <img
        src={image}
        alt={city}
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
      />

     
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full p-6">
 
        <div className="flex items-end justify-between">
         
          <div>
            <h2
              className={`text-white font-black ${
                large ? "text-[38px]" : "text-[28px]"
              }`}
            >
              {city}
            </h2>

            <p className="text-white/80 text-sm mt-2">
              The city that never sleeps.
            </p>
          </div>

      
          <div className="bg-white/15 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl">
            <p className="text-[10px] uppercase tracking-[2px] text-white/70 font-semibold">
              Starting From
            </p>

            <p className="text-white font-bold text-lg mt-1">{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
