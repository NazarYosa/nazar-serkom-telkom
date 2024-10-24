// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Daftarkan komponen yang dibutuhkan oleh Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function App() {
//   // Array IPK untuk setiap semester
//   const ipkPerSemester = [3.2, 3.4, 3.1, 3.6, 2.9, 3.5, 3.7, 3.8];

//   // State untuk menyimpan data form
//   const [formData, setFormData] = useState({
//     nama: "",
//     email: "",
//     noHp: "",
//     semester: "",
//     ipk: "",
//     pilihanBeasiswa: "",
//     berkas: null,
//   });

//   const [status, setStatus] = useState(""); // Status untuk hasil form
//   const [isBeasiswaActive, setIsBeasiswaActive] = useState(false); // Disable pilihan beasiswa jika IPK < 3
//   const [activeTab, setActiveTab] = useState(1); // Untuk mengatur tab navbar

//   // Fungsi untuk mengupdate data form
//   function handleChange(e) {
//     const { name, value } = e.target;

//     if (name === "semester") {
//       // Dapatkan IPK dari semester yang dipilih
//       setFormData({
//         ...formData,
//         semester: value,
//         ipk: ipkPerSemester[value - 1] || "",
//       });
//     } else {
//       // Perubahan untuk input lainnya
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   }

//   // Fungsi untuk menghandle submit form
//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!validateEmail(formData.email)) {
//       alert("Email tidak valid");
//       return;
//     }

//     if (isNaN(formData.noHp)) {
//       alert("Nomor HP harus berupa angka");
//       return;
//     }

//     if (formData.ipk < 3) {
//       alert("IPK harus di atas 3 untuk mendaftar beasiswa");
//       return;
//     }

//     setStatus("Belum diverifikasi");
//     alert("Pendaftaran berhasil! Status: Belum diverifikasi");
//     setActiveTab(3);
//   }

//   // Fungsi untuk validasi email
//   function validateEmail(email) {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   }

//   // Aktifkan atau non-aktifkan pilihan beasiswa berdasarkan IPK
//   useEffect(() => {
//     setIsBeasiswaActive(formData.ipk >= 3);
//   }, [formData.ipk]);

//   // Data untuk grafik
//   const chartData = {
//     labels: [
//       "Semester 1",
//       "Semester 2",
//       "Semester 3",
//       "Semester 4",
//       "Semester 5",
//       "Semester 6",
//       "Semester 7",
//       "Semester 8",
//     ],
//     datasets: [
//       {
//         label: "IPK per Semester",
//         data: ipkPerSemester,
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//     ],
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="flex space-x-4 mb-6">
//         <button
//           className={`px-4 py-2 ${
//             activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab(1)}
//         >
//           Persyaratan Beasiswa
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab(2)}
//         >
//           Formulir
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeTab === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab(3)}
//         >
//           Hasil
//         </button>
//       </nav>

//       {activeTab === 1 && (
//         <div>
//           <h1 className="text-2xl font-bold">Persyaratan Beasiswa</h1>
//           <p className="mt-4">1. IPK minimal 3.0</p>
//           <p>2. Upload berkas dalam format PDF atau JPG.</p>
//         </div>
//       )}

//       {activeTab === 2 && (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block">Nama:</label>
//             <input
//               type="text"
//               name="nama"
//               value={formData.nama}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div>
//             <label className="block">Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div>
//             <label className="block">Nomor HP:</label>
//             <input
//               type="text"
//               name="noHp"
//               value={formData.noHp}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div>
//             <label className="block">Semester:</label>
//             <select
//               name="semester"
//               value={formData.semester}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             >
//               <option value="">Pilih Semester</option>
//               <option value="1">Semester 1</option>
//               <option value="2">Semester 2</option>
//               <option value="3">Semester 3</option>
//               <option value="4">Semester 4</option>
//               <option value="5">Semester 5</option>
//               <option value="6">Semester 6</option>
//               <option value="7">Semester 7</option>
//               <option value="8">Semester 8</option>
//             </select>
//           </div>
//           <div>
//             <label className="block">IPK Terakhir:</label>
//             <input
//               type="text"
//               name="ipk"
//               value={formData.ipk}
//               readOnly
//               className="border p-2 w-full bg-gray-200"
//             />
//           </div>
//           <div>
//             <label className="block">Pilihan Beasiswa:</label>
//             <select
//               name="pilihanBeasiswa"
//               value={formData.pilihanBeasiswa}
//               onChange={handleChange}
//               disabled={!isBeasiswaActive}
//               className="border p-2 w-full"
//               required
//             >
//               <option value="">Pilih Beasiswa</option>
//               <option value="akademik">Akademik</option>
//               <option value="non-akademik">Non-Akademik</option>
//             </select>
//           </div>
//           <div>
//             <label className="block">Upload Berkas:</label>
//             <input
//               type="file"
//               name="berkas"
//               onChange={(e) =>
//                 setFormData({ ...formData, berkas: e.target.files[0] })
//               }
//               disabled={!isBeasiswaActive}
//               className="border p-2 w-full"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Daftar
//             </button>
//             <button
//               type="reset"
//               className="ml-4 bg-gray-500 text-white py-2 px-4 rounded"
//             >
//               Batal
//             </button>
//           </div>
//         </form>
//       )}

//       {activeTab === 3 && status && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold">Hasil Pendaftaran</h2>
//           <p>Nama: {formData.nama}</p>
//           <p>Email: {formData.email}</p>
//           <p>Nomor HP: {formData.noHp}</p>
//           <p>Semester: {formData.semester}</p>
//           <p>IPK: {formData.ipk}</p>
//           <p>Pilihan Beasiswa: {formData.pilihanBeasiswa}</p>
//           <p>Status Ajuan: {status}</p>

//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Grafik IPK</h3>
//             <Bar data={chartData} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from "react"; // Mengimpor React dan beberapa hook yang akan digunakan.
import { Bar } from "react-chartjs-2"; // Mengimpor komponen Bar dari react-chartjs-2 untuk grafik batang.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Mengimpor komponen dari Chart.js untuk mempersiapkan grafik.

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
); // Mendaftarkan elemen grafik yang akan digunakan.

function App() {
  // Inisialisasi data IPK per semester.
  const ipkPerSemester = [3.2, 3.4, 3.1, 3.6, 2.9, 3.5, 3.7, 3.8];
  
  // Menggunakan useState untuk mengelola state dari form.
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noHp: "",
    semester: "",
    ipk: "",
    pilihanBeasiswa: "",
    berkas: null,
  });

  // State untuk menyimpan status pendaftaran.
  const [status, setStatus] = useState("");
  
  // State untuk mengatur apakah pilihan beasiswa aktif atau tidak.
  const [isBeasiswaActive, setIsBeasiswaActive] = useState(false);
  
  // State untuk mengatur tab yang aktif (1, 2, atau 3).
  const [activeTab, setActiveTab] = useState(1);
  
  // Referensi untuk elemen pilihan beasiswa.
  const beasiswaRef = useRef(null);

  // Fungsi untuk menangani perubahan input.
  function handleChange(e) {
    const { name, value } = e.target; // Mendapatkan nama dan nilai dari input.

    // Jika input adalah semester, setel nilai IPK sesuai dengan semester yang dipilih.
    if (name === "semester") {
      setFormData({
        ...formData,
        semester: value,
        ipk: ipkPerSemester[value - 1] || "",
      });
    } else {
      // Untuk input lainnya, setel nilai sesuai dengan input.
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  // Fungsi untuk menangani perubahan file yang diunggah.
  function handleFileChange(e) {
    const file = e.target.files[0]; // Mengambil file pertama yang diunggah.
    
    // Memeriksa apakah file yang diunggah adalah PDF.
    if (file && file.type !== "application/pdf") {
      alert("Hanya file PDF yang diperbolehkan");
      setFormData({ ...formData, berkas: null }); // Reset berkas jika tidak valid.
      e.target.value = null; // Menghapus nilai input file.
    } else {
      // Setel berkas jika valid.
      setFormData({ ...formData, berkas: file });
    }
  }

  // Fungsi untuk menangani pengiriman formulir.
  function handleSubmit(e) {
    e.preventDefault(); // Mencegah reload halaman saat formulir dikirim.

    // Validasi email.
    if (!validateEmail(formData.email)) {
      alert("Email tidak valid");
      return;
    }

    // Validasi nomor HP.
    if (isNaN(formData.noHp)) {
      alert("Nomor HP harus berupa angka");
      return;
    }

    // Validasi IPK.
    if (formData.ipk < 3) {
      alert("IPK harus di atas 3 untuk mendaftar beasiswa");
      return;
    }

    // Set status pendaftaran dan notifikasi.
    setStatus("Belum diverifikasi");
    alert("Pendaftaran berhasil! Status: Belum diverifikasi");
    setActiveTab(3); // Pindah ke tab hasil setelah pendaftaran.
  }

  // Fungsi untuk memvalidasi format email.
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression untuk memvalidasi email.
    return regex.test(email); // Mengembalikan true atau false.
  }

  // useEffect untuk memantau perubahan IPK.
  useEffect(() => {
    setIsBeasiswaActive(formData.ipk >= 3); // Aktifkan pilihan beasiswa jika IPK >= 3.
    
    // Pindahkan fokus ke pilihan beasiswa jika IPK >= 3.
    if (formData.ipk >= 3 && beasiswaRef.current) {
      beasiswaRef.current.focus();
    }
  }, [formData.ipk]); // Menjalankan efek ini setiap kali formData.ipk berubah.

  // Data untuk grafik.
  const chartData = {
    labels: [
      "Semester 1",
      "Semester 2",
      "Semester 3",
      "Semester 4",
      "Semester 5",
      "Semester 6",
      "Semester 7",
      "Semester 8",
    ],
    datasets: [
      {
        label: "IPK per Semester",
        data: ipkPerSemester,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Warna untuk grafik.
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="flex space-x-4 mb-6">
        {/* Navigasi untuk memilih tab */}
        <button
          className={`px-4 py-2 ${
            activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(1)} // Pindah ke tab persyaratan beasiswa.
        >
          Persyaratan Beasiswa
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(2)} // Pindah ke tab formulir.
        >
          Formulir
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(3)} // Pindah ke tab hasil.
        >
          Hasil
        </button>
      </nav>

      {/* Konten untuk tab persyaratan beasiswa */}
      {activeTab === 1 && (
        <div>
          <h1 className="text-2xl font-bold">Persyaratan Beasiswa</h1>
          <p className="mt-4">1. IPK minimal 3.0</p>
          <p>2. Upload berkas dalam format PDF.</p>
        </div>
      )}

      {/* Konten untuk tab formulir */}
      {activeTab === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Nama:</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Nomor HP:</label>
            <input
              type="number"
              name="noHp"
              value={formData.noHp}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Semester:</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="">Pilih Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>
          <div>
            <label>IPK Terakhir:</label>
            <input
              type="text"
              name="ipk"
              value={formData.ipk}
              readOnly
              className="border p-2 w-full bg-gray-200"
            />
          </div>
          <div>
            <label>Pilihan Beasiswa:</label>
            <select
              name="pilihanBeasiswa"
              value={formData.pilihanBeasiswa}
              onChange={handleChange}
              disabled={!isBeasiswaActive} // Menonaktifkan pilihan jika tidak memenuhi syarat.
              ref={beasiswaRef} // Menggunakan referensi untuk fokus.
              className="border p-2 w-full"
              required
            >
              <option value="">Pilih Beasiswa</option>
              <option value="akademik">Akademik</option>
              <option value="non-akademik">Non-Akademik</option>
            </select>
          </div>
          <div>
            <label>Upload Berkas:</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Daftar
            </button>
            <button
              type="reset"
              className="ml-4 bg-gray-500 text-white py-2 px-4 rounded"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Tab untuk Hasil Pendaftaran */}
      {activeTab === 3 && status && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Hasil Pendaftaran</h2>
          <p>Nama: {formData.nama}</p>
          <p>Email: {formData.email}</p>
          <p>Nomor HP: {formData.noHp}</p>
          <p>Semester: {formData.semester}</p>
          <p>IPK: {formData.ipk}</p>
          <p>Pilihan Beasiswa: {formData.pilihanBeasiswa}</p>
          <p>Status Ajuan: {status}</p>

          {/* Grafik IPK */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Grafik IPK</h3>
            <Bar data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App; // Mengekspor komponen App sebagai default export.
