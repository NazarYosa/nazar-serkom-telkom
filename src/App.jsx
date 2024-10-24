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


import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen-komponen Chart.js yang diperlukan untuk membuat grafik
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  // Data IPK untuk setiap semester
  const ipkPerSemester = [3.2, 3.4, 3.1, 3.6, 2.9, 3.5, 3.7, 3.8];

  // State untuk menyimpan data form yang dimasukkan oleh pengguna
  const [formData, setFormData] = useState({
    nama: "", // Nama pengguna
    email: "", // Email pengguna
    noHp: "", // Nomor HP pengguna
    semester: "", // Semester yang dipilih
    ipk: "", // IPK yang akan diisi berdasarkan semester
    pilihanBeasiswa: "", // Pilihan beasiswa
    berkas: null, // Berkas PDF yang diupload
  });

  // State untuk menyimpan status pendaftaran
  const [status, setStatus] = useState("");

  // State untuk mengatur apakah pilihan beasiswa aktif atau tidak
  const [isBeasiswaActive, setIsBeasiswaActive] = useState(false);

  // State untuk menyimpan tab aktif di navigasi
  const [activeTab, setActiveTab] = useState(1);

  // Fungsi ini dijalankan setiap kali ada perubahan pada input
  function handleChange(e) {
    const { name, value } = e.target; // Mengambil nama dan nilai dari input

    if (name === "semester") {
      // Jika input yang diubah adalah semester, IPK otomatis disesuaikan
      setFormData({
        ...formData,
        semester: value,
        ipk: ipkPerSemester[value - 1] || "", // Pilih IPK berdasarkan semester
      });
    } else {
      // Jika input lain yang diubah, perbarui nilainya saja tanpa mengubah yang lain
      setFormData({
        ...formData, // Salin data formData yang sudah ada
        [name]: value, // Perbarui data sesuai dengan input yang diubah
      });
    }
  }

  // Fungsi ini dijalankan ketika pengguna mengupload file
  function handleFileChange(e) {
    const file = e.target.files[0]; // Ambil file yang diupload
    // Cek apakah file yang diupload adalah PDF
    if (file && file.type !== "application/pdf") {
      alert("Hanya file PDF yang diperbolehkan"); // Jika bukan PDF, beri peringatan
      setFormData({ ...formData, berkas: null }); // Set berkas menjadi null
      e.target.value = null; // Reset input file
    } else {
      setFormData({ ...formData, berkas: file }); // Simpan file jika valid
    }
  }

  // Fungsi untuk submit form
  function handleSubmit(e) {
    e.preventDefault(); // Mencegah reload halaman ketika submit

    // Validasi apakah email yang dimasukkan valid
    if (!validateEmail(formData.email)) {
      alert("Email tidak valid");
      return;
    }

    // Validasi apakah nomor HP adalah angka
    if (isNaN(formData.noHp)) {
      alert("Nomor HP harus berupa angka");
      return;
    }

    // Validasi apakah IPK memenuhi syarat
    if (formData.ipk < 3) {
      alert("IPK harus di atas 3 untuk mendaftar beasiswa");
      return;
    }

    // Jika semua validasi lolos, set status pendaftaran
    setStatus("Belum diverifikasi");
    alert("Pendaftaran berhasil! Status: Belum diverifikasi");

    // Pindah ke tab hasil
    setActiveTab(3);
  }

  // Fungsi untuk validasi email menggunakan regex (pola karakter)
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); // Cek apakah email cocok dengan pola
  }

  // Fungsi ini dijalankan setiap kali IPK berubah untuk mengaktifkan atau menonaktifkan beasiswa
  useEffect(() => {
    setIsBeasiswaActive(formData.ipk >= 3); // Aktifkan beasiswa jika IPK >= 3
  }, [formData.ipk]); // Fungsi ini hanya berjalan ketika nilai IPK berubah

  // Data untuk grafik IPK
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
        label: "IPK per Semester", // Label grafik
        data: ipkPerSemester, // Data untuk grafik
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Warna batang grafik
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      {/* Bagian untuk navigasi tab */}
      <nav className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 ${
            activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(1)} // Pindah ke tab persyaratan
        >
          Persyaratan Beasiswa
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(2)} // Pindah ke tab formulir
        >
          Formulir
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(3)} // Pindah ke tab hasil
        >
          Hasil
        </button>
      </nav>

      {/* Tab untuk Persyaratan Beasiswa */}
      {activeTab === 1 && (
        <div>
          <h1 className="text-2xl font-bold">Persyaratan Beasiswa</h1>
          <p className="mt-4">1. IPK minimal 3.0</p>
          <p>2. Upload berkas dalam format PDF.</p>
        </div>
      )}

      {/* Tab untuk Formulir Pendaftaran */}
      {activeTab === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Nama:</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange} // Setiap perubahan di input akan diproses
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
              onChange={handleChange} // Setiap kali semester diubah, IPK juga diubah
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
              value={formData.ipk} // IPK otomatis diisi berdasarkan semester
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
              disabled={!isBeasiswaActive} // Pilihan beasiswa nonaktif jika IPK < 3
              className="border p-2 w-full"
              required
            >
              <option value="">Pilih Beasiswa</option>
              <option value="akademik">Akademik</option>
              <option value="non-akademik">Non-Akademik</option>
            </select>
          </div>
          <div>
            <label>Upload Berkas (PDF):</label>
            <input
              type="file"
              name="berkas"
              onChange={handleFileChange} // Fungsi untuk menangani file upload
              disabled={!isBeasiswaActive} // Nonaktif jika IPK < 3
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

export default App;
