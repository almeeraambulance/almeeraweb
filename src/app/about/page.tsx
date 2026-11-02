"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 animate-fade-in text-black">
      {/* breadcrumb */}
      <Breadcrumb items={[{ label: "Tentang Kami" }]} />

      {/* header section */}
      <header className="mb-12 text-left">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-[40px] font-black text-black tracking-tight"
        >
          Tentang Kami
        </motion.h1>
      </header>

      {/* content sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 text-black text-base md:text-lg leading-relaxed text-justify items-start">
        {/* section 1 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-4 text-left">
            Mengenal Lebih Dekat Layanan Kami
          </h2>
          <p className="mb-4">
            <strong className="text-black">Almeera Sejahtera Abadi</strong>{" "}
            hadir sebagai solusi dan penopang utama bagi keluarga yang
            menghadapi masa-masa sulit dalam pengurusan kedukaan. Berbasis di
            Kota Tangerang, kami mendedikasikan diri untuk menyediakan layanan
            transportasi medis darurat serta pengurusan jenazah yang
            komprehensif, cepat, aman, dan bermartabat.
          </p>
          <p>
            Seluruh layanan dirancang dengan mengutamakan prinsip kepedulian
            tinggi, kecepatan respons di setiap situasi darurat, serta
            keterbukaan dalam setiap prosedur agar keluarga yang ditinggalkan
            merasa tenang dan terbantu sepenuhnya secara profesional.
          </p>
        </motion.section>

        {/* section 2 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-4 text-left">
            Sejarah & Komitmen Layanan
          </h2>
          <p className="mb-4">
            Berawal dari kepedulian mendalam atas tingginya kebutuhan masyarakat
            akan layanan darurat dan kedukaan yang tertata profesional di
            wilayah Tangerang dan sekitarnya, Almeera Sejahtera Abadi tumbuh
            dengan memegang teguh prinsip empati, transparansi, dan kecepatan
            respons.
          </p>
          <p>
            Dalam perjalanannya, kami terus memperluas kapasitas armada serta
            meningkatkan kualitas sumber daya manusia agar setiap prosesi—mulai
            dari penjemputan darurat, pemulasaraan, penyediaan peti jenazah
            berkualitas, hingga pengiriman domestik maupun internasional
            (repatriasi)—dapat berjalan lancar tanpa membebani keluarga yang
            sedang berduka.
          </p>
        </motion.section>

        {/* section 3 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-4 text-left">
            Standar & Keunggulan Operasional
          </h2>
          <p className="mb-4">
            Keunggulan operasional kami didasarkan pada kesiapan infrastruktur
            dan tenaga ahli berpengalaman di bidangnya:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-black text-left">
            <li>
              <strong className="text-black">Siaga 24/7:</strong> Layanan
              operasional penuh sepanjang hari untuk merespons situasi darurat
              kapan pun dibutuhkan.
            </li>
            <li>
              <strong className="text-black">Armada Khusus Terawat:</strong>{" "}
              Didukung unit ambulance dan mobil jenazah bersih, higienis, serta
              memenuhi standar medis kedukaan.
            </li>
            <li>
              <strong className="text-black">Pendampingan Penuh:</strong>{" "}
              Pengurusan dokumen kepabeanan, surat jalan, hingga koordinasi
              lintas wilayah domestik dan internasional secara tuntas.
            </li>
          </ul>
        </motion.section>

        {/* section 4 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-4 text-left">
            Jangkauan & Repatriasi Lintas Wilayah
          </h2>
          <p className="mb-4">
            Almeera Sejahtera Abadi tidak hanya melayani area Tangerang dan
            Jabodetabek, tetapi juga memiliki kapabilitas penuh untuk
            memfasilitasi pengiriman jenazah maupun abu jenazah ke berbagai
            pelosok nusantara hingga antarnegara.
          </p>
          <p>
            Dengan jaringan pemulasaraan formal, pengurusan karantina kesehatan,
            serta legalitas maskapai penerbangan cargo yang lengkap, kami
            memastikan seluruh alur repatriasi berjalan efisien, aman, serta
            menghormati nilai-nilai penghormatan terakhir almarhum beserta
            keluarga.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
