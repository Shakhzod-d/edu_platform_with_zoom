export default function TutorDisplay() {
  return (
    <div className="border border-gray-100 rounded-10">
      <p className="text-lg font-medium bg-gray-100 px-5 py-4 rounded-t-10">Calendar display</p>

      <ul className="px-6 py-4 space-y-5">
        <li className="flex-center gap-x-3">
          <div className="bg-green w-12 h-8 rounded-5" />

          <span>Priority hours</span>
        </li>

        <li className="flex-center gap-x-3">
          <div className="bg-white w-12 h-8 rounded-5 border border-gray-100" />

          <span>Available priority hours</span>
        </li>
      </ul>
    </div>
  )
}
