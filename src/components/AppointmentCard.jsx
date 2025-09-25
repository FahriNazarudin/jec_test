import {
  CalculatorIcon,
  CircleUserRound,
  EllipsisVertical,
  Eye,
  Smartphone,
} from "lucide-react";

export default function AppointmentCard({ appointment }) {

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatHour = (dateString) => {
    return new Date(dateString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAge = (birthdayString) => {
    if (!birthdayString) return "";

    const age =
      new Date().getFullYear() - new Date(birthdayString).getFullYear();
    return `(${age})`;
  };



  return (
    <tbody className="border-2">
      <tr className="hover:bg-gray-50 ">
        <td className="border border-gray-300 px-3 py-4 w-[185px] align-top ">
          <p>{appointment.registNum} </p>
          <span>App. Date</span>
          <br />
          {formatDate(appointment.registrationTime)} {", "}
          {formatHour(appointment.registrationTime)}
        </td>
        <td className="border border-gray-300 px-3 py-4 w-[90px] align-top">
          <span>Channel</span> <br />
          {appointment.channel}
        </td>
        <td className="border border-gray-300 px-3 py-4 w-[300px] align-top">
          <div className="flex flex-row gap-4 items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg"></div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="truncate max-w-[150px] font-medium">
                    {appointment.patient.name}
                  </p>
                  <p className="font-semibold">
                    {formatAge(appointment.patient.birthday)}
                  </p>
                </div>
                {!appointment.medicalNo && (
                  <span className="bg-red-500 text-white text-xs p-1 rounded font-bold">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 ">
                {appointment.patient.gender},{" "}
                {formatDate(appointment.patient.birthday)}
                {appointment.medicalNo && `, ${appointment.medicalNo}`}
              </p>
            </div>
          </div>
        </td>
        <td className="border border-gray-300 px-3 py-4 w-[280px]"></td>
        <td className="border border-gray-300 px-3 py-4 w-[180px] align-top">
          <div className="flex justify-between items-center mb-2">
            <span >Phone No :</span>
            <Eye size={16} className="text-gray-400" />
          </div>
          <div className="text-sm text-gray-500 flex flex-col">
            <div>
              <CalculatorIcon /> <br />
            </div>
            <div className="flex items-center gap-2">
              <Smartphone /> {appointment.patient.mobilePhone}
            </div>
          </div>
        </td>
        <td className="border border-gray-300 px-3 py-4 w-[340px] align-top">
          <div className="flex flex-row gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg"></div>
            </div>
            <div>
              {appointment.doctor.name} <br />
              <p className="bg-[#F0E68CAD] rounded-lg inline-block">
                {appointment.doctor.specialty}
              </p>
            </div>
          </div>
        </td>
        <td className="border border-gray-300 px-3 py-4 w-[180px] align-top">
          <span>Service Unit : </span> <br />
          <p className="bg-[#CFFAFE] rounded-lg  p-1 font-bold inline-block">
            {appointment.serviceUnit}
          </p>
        </td>
        <td className="border border-gray-300 px-3 py-4 w-[280px] align-top">
          <span>Notes :</span> <br />
        </td>
        <td className="border border-gray-300 px-3 py-4 w-[200px] align-top ">
          <div className="space-y-1">
            <span> Last Update :</span>
            <p>{appointment.lastUpdate.from}</p>
            <p>
              {formatDate(appointment.lastUpdate.time)} {"On "}{" "}
              {formatHour(appointment.lastUpdate.time)}
            </p>
          </div>
        </td>
        <td className="border border-gray-300 px-3 py-4 w-[70px] ">
          <button className="p-4 border-lg rounded-lg shadow">
            <EllipsisVertical />
          </button>
        </td>
      </tr>
    </tbody>
  );
}
