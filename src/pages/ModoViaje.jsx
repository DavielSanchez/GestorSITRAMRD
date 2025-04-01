function ModoViaje() {
  return (
    <main className="flex-1 p-4 md:px-8 md:py-8 flex flex-col items-center">
      <h1 className="text-[#6a62dc] text-5xl md:text-6xl font-semibold font-['Inter'] text-center">
        Validación de boletos
      </h1>

      <div className="w-60 h-60 md:w-80 md:h-80 bg-[#f1f1ff] rounded-2xl flex flex-col items-center justify-center mt-6 md:mt-8 mb-4 md:mb-6 p-6">
        <img
          className="w-32 h-32 md:w-50 md:h-50"
          src="../../src/assets/QRSITRAMRD.png"
          alt="Escáner"
        />
      </div>

      <button className="w-full md:w-auto px-6 py-3 bg-[#6a62dc] text-white text-lg md:text-xl font-medium rounded-lg shadow-md hover:bg-[#5548c2] transition-all">
        Escanea tu código QR
      </button>
    </main>
  );
}

export default ModoViaje;
