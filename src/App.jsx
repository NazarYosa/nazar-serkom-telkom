import React, { useState, useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2"; // Mengimpor komponen Pie dari react-chartjs-2 untuk grafik pai.
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Mengimpor ArcElement, Tooltip, dan Legend.

ChartJS.register(
  ArcElement, // Mendaftarkan elemen arc untuk grafik pai.
  Tooltip,
  Legend
);

function App() {
  const ipkPerSemester = [3.2, 3.4, 3.1, 3.6, 2.9, 3.5, 3.7, 3.8];
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noHp: "",
    semester: "",
    ipk: "",
    pilihanBeasiswa: "",
    berkas: null,
  });
  const [pendaftaran, setPendaftaran] = useState([]); // Array untuk menyimpan semua pendaftaran
  const [status, setStatus] = useState("");
  const [isBeasiswaActive, setIsBeasiswaActive] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const beasiswaRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "semester") {
      setFormData({
        ...formData,
        semester: value,
        ipk: ipkPerSemester[value - 1] || "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Hanya file PDF yang diperbolehkan");
      setFormData({ ...formData, berkas: null });
      e.target.value = null;
    } else {
      setFormData({ ...formData, berkas: file });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Email tidak valid");
      return;
    }
    if (isNaN(formData.noHp)) {
      alert("Nomor HP harus berupa angka");
      return;
    }
    if (formData.ipk < 3) {
      alert("IPK harus di atas 3 untuk mendaftar beasiswa");
      return;
    }

    // Tambahkan data pendaftaran ke array
    setPendaftaran([
      ...pendaftaran,
      { ...formData, status: "Belum diverifikasi" },
    ]);
    setStatus("Belum diverifikasi");
    alert("Pendaftaran berhasil! Status: Belum diverifikasi");
    setActiveTab(3);

    // Reset form setelah pendaftaran
    setFormData({
      nama: "",
      email: "",
      noHp: "",
      semester: "",
      ipk: "",
      pilihanBeasiswa: "",
      berkas: null,
    });
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  useEffect(() => {
    setIsBeasiswaActive(formData.ipk >= 3);
    if (formData.ipk >= 3 && beasiswaRef.current) {
      beasiswaRef.current.focus();
    }
  }, [formData.ipk]);

  // Data untuk grafik pai berdasarkan pilihan beasiswa.
  const chartData = {
    labels: ["Akademik", "Non-Akademik"],
    datasets: [
      {
        label: "Pilihan Beasiswa",
        data: [
          pendaftaran.filter((item) => item.pilihanBeasiswa === "akademik")
            .length,
          pendaftaran.filter((item) => item.pilihanBeasiswa === "non-akademik")
            .length,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Warna untuk akademik
          "rgba(255, 99, 132, 0.6)", // Warna untuk non-akademik
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 ${
            activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Persyaratan Beasiswa
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Formulir
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(3)}
        >
          Hasil
        </button>
      </nav>

      {activeTab === 1 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-8">
            Beasiswa Ramah: Kesempatan untuk Masa Depan Gemilang
          </h2>

          <p className="mt-6 text-lg text-center mb-8">
            Beasiswa Ramah adalah program beasiswa yang dirancang untuk
            memberikan kesempatan kepada mahasiswa berprestasi, baik di bidang
            akademik maupun non-akademik. Kami percaya bahwa setiap mahasiswa
            memiliki potensi untuk sukses, dan kami berkomitmen untuk mendukung
            perjalanan pendidikan mereka dengan menyediakan beasiswa yang sesuai
            dengan bakat dan minat mereka.
          </p>
          <h1 className="text-3xl font-bold text-center mb-6">
            Persyaratan Beasiswa
          </h1>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">1. Beasiswa Akademik</h2>
            <p className="mb-4">
              Beasiswa ini ditujukan untuk mahasiswa dengan prestasi akademik
              yang tinggi. Mahasiswa yang berhasil mendapatkan beasiswa ini
              diharapkan dapat mempertahankan performa akademik mereka selama
              masa studi.
            </p>
            <p className="mb-4">
              **Syarat:**
              <ul className="list-disc ml-6 mt-2">
                <li>IPK minimal 3.0.</li>
                <li>
                  Dokumen pendukung, seperti transkrip nilai dan surat
                  rekomendasi dari dosen.
                </li>
                <li>
                  Menulis esai motivasi yang menjelaskan tujuan akademis Anda.
                </li>
              </ul>
            </p>
            <p className="mt-2 mb-6">
              Beasiswa akademik tidak hanya membantu meringankan beban biaya
              pendidikan, tetapi juga memberikan kesempatan bagi mahasiswa untuk
              terlibat dalam program pengembangan diri dan penelitian di kampus.
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              2. Beasiswa Non-Akademik
            </h2>
            <p className="mb-4">
              Beasiswa ini diberikan kepada mahasiswa yang aktif dalam kegiatan
              non-akademik, seperti organisasi, olahraga, atau kegiatan sosial.
              Kegiatan ini diharapkan dapat mengembangkan keterampilan
              kepemimpinan dan kerjasama tim.
            </p>
            <p className="mb-4">
              **Syarat:**
              <ul className="list-disc ml-6 mt-2">
                <li>IPK minimal 3.0.</li>
                <li>
                  Bukti partisipasi dalam kegiatan non-akademik, seperti
                  sertifikat atau surat rekomendasi.
                </li>
                <li>
                  Menulis esai motivasi tentang kontribusi Anda di kegiatan
                  tersebut.
                </li>
              </ul>
            </p>
            <p className="mt-2 mb-6">
              Mahasiswa penerima beasiswa non-akademik diharapkan untuk
              berkontribusi kembali kepada komunitas dan menjadi duta kampus
              yang baik, sehingga menciptakan lingkungan belajar yang lebih
              dinamis dan inklusif.
            </p>
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-4">Persyaratan Umum:</h2>
          <ol className="list-decimal ml-6 mt-2 mb-6">
            <li>IPK minimal 3.0.</li>
            <li>Upload berkas dalam format PDF, termasuk dokumen pendukung.</li>
            <li>Lengkapi formulir pendaftaran dengan benar dan jelas.</li>
            <li>Berpartisipasi dalam wawancara jika diperlukan.</li>
            <li>
              Menyerahkan esai motivasi yang menjelaskan tujuan Anda dalam
              melanjutkan pendidikan.
            </li>
          </ol>

          <h2 className="text-lg font-semibold mt-6 mb-4">
            Visi dan Misi Kami:
          </h2>
          <p className="mt-2 mb-6">
            Kami percaya bahwa pendidikan adalah kunci untuk mencapai masa depan
            yang lebih baik. Visi kami adalah menciptakan lingkungan yang
            mendukung pengembangan akademik dan karakter mahasiswa melalui
            berbagai program beasiswa. Misi kami adalah menyediakan kesempatan
            bagi mahasiswa berprestasi untuk mendapatkan pendidikan yang
            berkualitas, sekaligus mendorong mereka untuk berkontribusi kepada
            masyarakat.
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-4">Kerja Sama:</h2>
          <p className="mt-2 mb-6">
            Kami bekerja sama dengan berbagai institusi pendidikan, organisasi
            non-pemerintah, dan perusahaan untuk menyediakan sumber daya yang
            diperlukan bagi mahasiswa. Kerja sama ini bertujuan untuk
            meningkatkan akses pendidikan serta menyediakan program pengembangan
            keterampilan yang relevan.
          </p>

          <p className="mt-4 text-center text-sm text-gray-500">
            Pastikan semua dokumen dan informasi yang diberikan adalah benar dan
            akurat untuk menghindari masalah di kemudian hari. Kami berkomitmen
            untuk memberikan bantuan kepada mahasiswa yang berprestasi dan aktif
            dalam meningkatkan kualitas diri serta komunitas. Jika Anda memiliki
            pertanyaan lebih lanjut, jangan ragu untuk menghubungi pihak panitia
            beasiswa.
          </p>
        </div>
      )}

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
              disabled={!isBeasiswaActive}
              ref={beasiswaRef}
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
              disabled={formData.ipk < 3}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Daftar
            </button>
            {/* <button
              type="reset"
              className="ml-4 bg-gray-500 text-white py-2 px-4 rounded"
            >
              Batal
            </button> */}
          </div>
        </form>
      )}

      {activeTab === 3 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Hasil Pendaftaran</h2>
          {pendaftaran.length === 0 ? (
            <div className="h-64 bg-white  rounded-lg">
              {/* Area kosong tanpa teks */}
            </div>
          ) : (
            <>
              {pendaftaran.map((data, index) => (
                <div key={index} className="mb-4">
                  <p>Nama: {data.nama}</p>
                  <p>Email: {data.email}</p>
                  <p>Nomor HP: {data.noHp}</p>
                  <p>Semester: {data.semester}</p>
                  <p>IPK: {data.ipk}</p>
                  <p>Pilihan Beasiswa: {data.pilihanBeasiswa}</p>
                  <p>Status Ajuan: {data.status}</p>
                </div>
              ))}

              {/* Grafik Pilihan Beasiswa */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">
                  Grafik Pilihan Beasiswa
                </h3>
                <Pie data={chartData} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
