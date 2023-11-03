import placeHolder from '../assets/placeholder.png'

export default function LocationItems({Restaurant, items}){
    return (
    <div className="flex flex-col items-center">
        <h1 className="text-[#644536] text-4xl font-bold mt-20">{title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 mb-96">
            {items.map(item => (
                <div key={item.id} className="border p-4">
                
                <img 
                    src={placeHolder}
                    alt={item.name}
                    className="w-full h-48 object-cover mb-4"
                />
    
                <h2 className="font-bold mb-2">{item.name}</h2>
    
                <p className="text-gray-500">{item.description}</p>
    
                <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg">${item.price}</span>
                    <button 
                    className="bg-[#537D8D] text-white py-2 px-4"
                    >
                    Add to Cart  
                    </button>
                </div>
    
                </div>
            ))}
        </div>
      </div>
    );
}