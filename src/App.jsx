import React, { useState } from "react";


const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    if (query.trim() === "") return;

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=TRdOwa5L-r4eJ5oWxYMkt5KceF1o_SFShmepNH1fOPA`
    );
    const data = await response.json();
    setImages(data.results);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
  };

  return (
    <div className="container mx-auto p-6 font-sans">
      <h1 className="text-4xl font-semibold text-center mb-6">Image Search App</h1>

      <form
        onSubmit={handleSubmit}
        className="flex justify-center mb-6"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          className="w-96 p-3 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="p-3 text-lg bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="w-full h-56 object-cover"
            />
            <p className="p-4 text-center text-sm text-gray-700">
              {image.alt_description || "Untitled"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
