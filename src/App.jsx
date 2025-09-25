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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentCard from "./components/AppointmentCard";
import { NavLink } from "react-router";
import logo from "./assets/logo.png";
import { fetchAppointmentsStart } from "./store/slices/appointmentSlice";
import {
  selectFilteredAppointments,
  selectAppointmentsLoading,
  selectAppointmentsError,
} from "./store/selectors/appointmentSelectors";

export default function App() {
  const dispatch = useDispatch();
  const appointments = useSelector(selectFilteredAppointments);
  const loading = useSelector(selectAppointmentsLoading);
  const error = useSelector(selectAppointmentsError);

  useEffect(() => {
    dispatch(fetchAppointmentsStart());
  }, [dispatch]);

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
                  {appointments.map((appointment) => {
                    return (
                      <AppointmentCard
                        key={appointment.id}
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
