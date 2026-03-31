"use client";

export default function ApiTest() {
  const testApi = async () => {
    const url = "https://karam.idreis.net/api/v1/register";
    
    try {
      console.log("Loading...");
      
      const response = await fetch(url, {
        method: "POST", 
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: "test1@example.com",
      password: "@Password123",
      name: "Ayman AlFarra",
      phone: "123456789",
      role: "user",
      location_id: 1,
        }), 
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ success", data);
      } else {
        console.log(`❌ error. status: ${response.status}`);
        console.log("error details:", data);
      }
    } catch (error) {
      console.error("🌐 error:", error);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={testApi}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        test api
      </button>
    </div>
  );
}