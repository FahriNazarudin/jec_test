import { ChevronDown, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAppointmentStart } from "../store/slices/appointmentSlice";
import { selectAppointmentsLoading } from "../store/selectors/appointmentSelectors";

export default function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAppointmentsLoading);

  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "DR. Dr. Johan A. Hutauruk, SpM(K)",
    appointmentDate: "2025-01-15",
    appointmentTime: "18:00",
    appointmentChannel: "Call Center",
    visitType: "Konsultasi",
    businessUnit: "JEC @ KEDOYA",
    serviceUnit: "EYE CLINIC",
    appointmentCriteria: "Konsultasi",
    paymentMethod: "Self Payment",
    guarantor: "",
    specialty: "Ophthalmologist",
    phone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.patientName.trim()) {
      alert("Patient name is required");
      return;
    }

    try {
      dispatch(addAppointmentStart(formData));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" mx-[72px] my-[8px]">
        <h1 className="font-bold">Outpatient</h1>

        <div className=" justify-items-start">
          <div className="flex flex-row  mx-2 mb-4 gap-4 ">
            <ul className="mx-2">Home</ul>
            <li className="mx-2">Admission</li>
            <li className="mx-2">Appointment</li>
            <li className="mx-2">Outpatient</li>
            <li className="mx-2">edit</li>
          </div>
        </div>

        <form onSubmit={handleCreate}>
          <div className="lg:col-span-2 rounded-lg p-6 ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* form kiri */}
              {/* form kiri - sebalah kiri */}
              <div className="flex flex-col gap-4">
                <div>
                  <div>
                    <div className="space-y-4 ">
                      {/* Patient Name Field */}
                      <div className="col-span-3 mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Patient Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          type="text"
                          name="patientName"
                          id="patientName"
                          placeholder="Enter patient name"
                          value={formData.patientName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Grid layout untuk form yang sejajar */}
                      <div className="grid grid-cols-3 gap-3 justify-center mb-4">
                        {/* Kolom 1: Appointment No */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Appointment No.
                          </label>
                          <input
                            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800"
                            type="text"
                            name="appointmentNo"
                            id="appointmentNo"
                            placeholder="APKDY/250902-00001"
                            readOnly
                          />
                        </div>

                        {/* Kolom 2: Date */}
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800"
                              type="text"
                              name="appointmentDate"
                              id="appointmentDate"
                              value="02/09/2025"
                              readOnly
                            />
                            <input
                              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800"
                              type="text"
                              name="appointmentTime"
                              id="appointmentTime"
                              value="18.00"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Appointment with
                        </label>
                        <div className="relative">
                          <select className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800 appearance-none">
                            <option>DR. Dr. Johan A. Hutauruk, SpM(K)</option>
                          </select>
                          <div className="absolute right-3 top-3 pointer-events-none">
                            <ChevronDown size={20} className="text-gray-500" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Appointment Channel{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800 appearance-none">
                              <option>Call Center</option>
                            </select>
                            <div className="absolute right-3 top-3 flex items-center gap-2">
                              <X size={16} className="text-gray-500" />
                              <ChevronDown
                                size={16}
                                className="text-gray-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Visit Type <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800 appearance-none">
                              <option>Konsultasi ...</option>
                            </select>
                            <div className="absolute right-3 top-3 flex items-center gap-2">
                              <X size={16} className="text-gray-500" />
                              <ChevronDown
                                size={16}
                                className="text-gray-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mt- bg-green-100">2</div>
              </div>
              {/* form kiri - sebalah kanan */}
              <div>
                <div>
                  <div className="space-y-4 ">
                    {/* Grid layout untuk form yang sejajar */}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Unit
                      </label>
                      <div className="relative">
                        <select className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800 appearance-none">
                          <option>JEC @ KEDOYA</option>
                        </select>
                        <div className="absolute right-3 top-3 pointer-events-none">
                          <ChevronDown size={20} className="text-gray-500" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Shift
                        </label>
                        <div className="relative">
                          <input
                            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800 appearance-none"
                            disabled
                            placeholder="-"
                          ></input>
                          <div className="absolute right-3 top-3 flex items-center gap-2"></div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Unit.
                        </label>
                        <div className="relative">
                          <select className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800 appearance-none">
                            <option>EYE CLINIC</option>
                          </select>
                          <div className="absolute right-3 top-3 flex items-center gap-2">
                            <X size={16} className="text-gray-500" />
                            <ChevronDown size={16} className="text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Appointment Criteria{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800 appearance-none">
                            <option>Konsultasi</option>
                          </select>
                          <div className="absolute right-3 top-3 flex items-center gap-2"></div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Method <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800 appearance-none">
                            <option>Self Payment</option>
                          </select>
                          <div className="absolute right-3 top-3 flex items-center gap-2">
                            <X size={16} className="text-gray-500" />
                            <ChevronDown size={16} className="text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Guarantor
                        </label>
                        <div className="relative">
                          <select
                            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-800 appearance-none"
                            name="guarantor"
                            value={formData.guarantor}
                            onChange={handleInputChange}
                          >
                            <option value="">Select...</option>
                            <option value="Self">Self</option>
                            <option value="Insurance">Insurance</option>
                          </select>
                          <div className="absolute right-3 top-3 flex items-center gap-2"></div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          type="tel"
                          name="phone"
                          placeholder="+62 812-3456-7890"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          type="email"
                          name="email"
                          placeholder="patient@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* form kanan */}

              <div className="bg-green-100">1</div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <div>
                {" "}
                <Link to="/">
                  <button
                    type="button"
                    className="px-6 py-3 text-white bg-[#F06548] hover:bg-[#e55a41] focus:ring-4 focus:ring-red-200 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white bg-[#26559DE5] hover:bg-blue-800 focus:ring-4 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
