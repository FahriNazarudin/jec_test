import Marquee from "react-fast-marquee";
import {
  Activity,
  Bell,
  Chromium,
  ClipboardList,
  Cog,
  Expand,
  Lock,
  PanelRightOpen,
  Rss,
  Signature,
  Smile,
  StickyNote,
} from "lucide-react";
import { useEffect, useState } from "react";
import AppointmentCard from "./components/AppointmentCard";
import { NavLink } from "react-router";
import logo from "./assets/logo.png";

// Fallback data jika fetch gagal
const fallbackData = [
  {
    "dataRaw": {
      "appointment_no": "APKDY/250902-00001",
      "appointment_date": "2025-09-02T00:00:00+07:00",
      "appointment_time": "18:00",
      "appointment_source": "Call Center",
      "patient_name": "An. FERNANDO RIYO JUNEDY SIMBOLONN",
      "gender": "GenderID-01",
      "date_of_birth": "1994-07-17T00:00:00+07:00",
      "medical_no": "002-000-01-06",
      "email": "*****",
      "mobile_phone_no": "*****",
      "paramedic_id": "DKDY0006",
      "paramedic_initial": "JH",
      "paramedic_name": "DR. Dr. Johan A. Hutauruk, SpM(K)",
      "paramedic_img_url": "/file_storage/example-doctor.jpg",
      "paramedic_specialization": "Ophthalmologist",
      "service_unit_id": "A101",
      "service_unit_name": "EYE CLINIC",
      "user_create": "21170",
      "user_create_name": "Fernando Riyo J Simbolon",
      "created_at": "2025-09-02T09:06:48+07:00",
      "user_update_name": "Fernando Riyo J Simbolon",
      "patient_id": "PKDY250707-0001",
      "legends": [
        {
          "color_type_id": "ColorType-02",
          "color_code": "#ff0000",
          "legend_name": "Patient Dewasa"
        }
      ]
    },
    "registrationTime": "2025-09-02T09:06:48+07:00",
    "appointmentTime": "2025-09-02T18:00:00+07:00",
    "channel": "Call Center",
    "address": "",
    "patient": {
      "name": "An. FERNANDO RIYO JUNEDY SIMBOLONN",
      "gender": "M",
      "birthday": "1994-07-17T00:00:00+07:00",
      "mobilePhone": "*****"
    },
    "registNum": "APKDY/250902-00001",
    "medicalNo": "002-000-01-06",
    "isNewReg": false,
    "serviceUnit": "EYE CLINIC",
    "room": "Lt.3 Room 3B",
    "type": "Consultation",
    "queue": "JH 001",
    "bed": "None",
    "doctor": {
      "name": "DR. Dr. Johan A. Hutauruk, SpM(K)",
      "specialty": "Ophthalmologist",
      "img": "blob:http://localhost:9801/d01c33d6-2bea-474d-840a-0ec082691624"
    },
    "lastUpdate": {
      "from": "Fernando Riyo J Simbolon",
      "time": "2025-09-02T09:06:48+07:00"
    }
  },
  {
    "dataRaw": {
      "appointment_no": "APKDY/250902-00002",
      "appointment_date": "2025-09-03T00:00:00+07:00",
      "appointment_time": "09:00",
      "appointment_source": "Online",
      "patient_name": "Tn. JOHN DOE SMITH",
      "gender": "GenderID-01",
      "date_of_birth": "1990-05-15T00:00:00+07:00",
      "medical_no": "002-000-01-07",
      "email": "john@example.com",
      "mobile_phone_no": "+62 812-3456-7890",
      "paramedic_id": "DKDY0007",
      "paramedic_initial": "MB",
      "paramedic_name": "DR. Dr. Michael Brown, SpM(K)",
      "paramedic_img_url": "/file_storage/example-doctor-2.jpg",
      "paramedic_specialization": "Cardiologist",
      "service_unit_id": "A102",
      "service_unit_name": "CARDIOLOGY CLINIC",
      "user_create": "21171",
      "user_create_name": "John Doe Smith",
      "created_at": "2025-09-03T08:00:00+07:00",
      "user_update_name": "John Doe Smith",
      "patient_id": "PKDY250707-0002",
      "legends": [
        {
          "color_type_id": "ColorType-01",
          "color_code": "#00ff00",
          "legend_name": "Patient Baru"
        }
      ]
    },
    "registrationTime": "2025-09-03T08:00:00+07:00",
    "appointmentTime": "2025-09-03T09:00:00+07:00",
    "channel": "Online",
    "address": "",
    "patient": {
      "name": "Tn. JOHN DOE SMITH",
      "gender": "M",
      "birthday": "1990-05-15T00:00:00+07:00",
      "mobilePhone": "+62 812-3456-7890"
    },
    "registNum": "APKDY/250902-00002",
    "medicalNo": "002-000-01-07",
    "isNewReg": true,
    "serviceUnit": "CARDIOLOGY CLINIC",
    "room": "Lt.2 Room 2A",
    "type": "Check-up",
    "queue": "MB 001",
    "bed": "None",
    "doctor": {
      "name": "DR. Dr. Michael Brown, SpM(K)",
      "specialty": "Cardiologist",
      "img": "blob:http://localhost:9801/example-doctor-2"
    },
    "lastUpdate": {
      "from": "John Doe Smith",
      "time": "2025-09-03T08:00:00+07:00"
    }
  }
];

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        console.log("Attempting to fetch /dummy.json...");
        const response = await fetch("/dummy.json");
        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch data`);
        }
        const data = await response.json();
        console.log("Data loaded successfully:", data.length, "appointments");
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Using fallback data instead");
        setAppointments(fallbackData);
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Marquee className="bg-[#1D2D5F] text-white py-2 px-4 text-sm">
        <p>
          (1/3) Info : Dr. Johan akan cuti dari tanggal 16 September 2025 sampai
          20 September 2025 karena seminar. (2/3) Info: DR. Dr. Iwan
          Soebijantoro, SpM(K) Tidak Praktek 12–18 Juli 2025, karena Workshop
          @Bangkok (3/3) Reminder: Input data rekam medis pasien harus
          diselesaikan sebelum pukul 17:00 setiap hari
        </p>
      </Marquee>

      {/* sidebar */}
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-20 h-screen bg-white shadow-lg border-r border-gray-200 mt-10"
        aria-label="Sidebar"
      >
        <div className="h-full py-4 overflow-y-auto">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo/Brand */}
            <div>
              <PanelRightOpen />
            </div>

            {/* Menu Items */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-200 cursor-pointer rounded-lg">
                <ClipboardList />
              </div>

              <div className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-200 cursor-pointer rounded-lg">
                <StickyNote />
              </div>

              <div className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-200 cursor-pointer rounded-lg">
                <Signature />
              </div>

              <div className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-200 cursor-pointer rounded-lg">
                <Activity />
              </div>

              <div className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-200 cursor-pointer rounded-lg">
                <Chromium />
              </div>

              <div className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-200 cursor-pointer rounded-lg">
                <Rss />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Navbar */}
      <nav className="p-4 text-white h-[70px] shadow ml-20">
        <div className=" mx-auto flex items-center justify-between">
          {/* nav kiri */}
          <div className="flex items-center gap-2">
            <div>
              {" "}
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "155px",
                  marginRight: "100px",
                }}
              />
            </div>
            <div className="shadow p-2 rounded-lg hover:bg-blue-900 cursor-pointer text-gray-500">
              <Bell />
            </div>
            <div className="shadow p-2 rounded-lg hover:bg-blue-900 cursor-pointer text-gray-500">
              <Lock />
            </div>
            <div className="shadow p-2 rounded-lg text-gray-500 w-[384px]">
              <input
                type="text"
                className="w-full border-none outline-none bg-transparent placeholder-gray-400"
              />
            </div>
          </div>

          {/* nav kanan */}
          <div className="flex items-center gap-4">
            <div className="shadow p-2 rounded-lg hover:bg-blue-900 cursor-pointer text-gray-500">
              <Cog />
            </div>
            <div className="shadow p-2 rounded-lg hover:bg-blue-900 cursor-pointer text-gray-500">
              <Expand />
            </div>
            <div className="text-sm text-black">
              <p>Your ip address is:</p>
              <span className="bg-blue-200 p-1 rounded-lg w-full">
                172.16.20.151
              </span>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img
                src=""
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen ml-20">
        <div className="p-6">
          <div className="mx-auto px-6 py-4">
            <div>
              {/* header */}
              <h1 className="mb-4 text-2xl font-bold">Outpatient</h1>
            </div>
          </div>

          {/* navigation */}
          <div className="container justify-items-start">
            <div className="flex flex-row  mx-2 mb-4 gap-4">
              <ul className="mx-2">Home</ul>
              <li className="mx-2">Admission</li>
              <li className="mx-2">Appointment</li>
              <li className="mx-2">Outpatient</li>
            </div>
          </div>

          <div>
            <button className="flex items-center gap-2 bg-[#26559DF2] rounded-full hover:bg-blue-800 ">
              <div className="bg-blue-400 p-2 rounded-full ">
                <Smile className="  text-white" />
              </div>
              <NavLink to="/form">
                <span className="text-lg font-medium text-white inline-block pr-4">
                  <p> New Appointment</p>
                </span>
              </NavLink>
            </button>
          </div>

          {/* table */}
          <div className="mt-6 overflow-x-auto">
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-4 text-gray-600">
                  Loading appointments...
                </span>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}

            {!loading && !error && (
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appointment, index) => {
                    return (
                      <AppointmentCard
                        key={appointment.registNum || index}
                        appointment={appointment}
                      />
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
