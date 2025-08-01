function DashboardCard({ label, value, icon, className }) {
  return (
    <div className={`max-w-sm p-6 rounded-lg shadow-sm ${className}`}>
      {icon}
      <p className="font-normal text-gray-600 dark:text-gray-200">{label}</p>
      <h4 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
        {value}
      </h4>
    </div>
  );
}

export default DashboardCard;
