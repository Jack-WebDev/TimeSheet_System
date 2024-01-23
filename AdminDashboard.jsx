// ... (imports and other code remain unchanged)

const ManageTimesheets = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState([]);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/timesheet/manager/timesheets"
        );

        setTimesheets(response.data);

        const avatarPromises = response.data.map(async (timesheet) => {
          const response = await fetch('https://randomuser.me/api/');
          const data = await response.json();
          return data.results[0];
        });

        const avatarData = await Promise.all(avatarPromises);
        setAvatars(avatarData);
      } catch (error) {
        console.error("Error fetching timesheets:", error);
        toast.error("Forbidden: Manager access required!");
      } finally {
        setLoading(false);
      }
    };

    fetchTimesheets();
  }, []);

  const handleTimesheet = (timesheetID, status) => {
    try {
      axios.put(`http://localhost:8001/api/employee/timesheet/${timesheetID}`, {
        status,
      });
      toast.success("Timesheet status updated successfully");
    } catch (error) {
      console.error("Error updating timesheet status:", error);
    }
  };

  const renderTimesheetCard = (timesheet, index) => {
    const randomUser = avatars[index];

    return (
      <div className="col-md-4 mb-4" key={timesheet.TimesheetID}>
        <Card className="p-3 d-flex flex-column align-items-center hero-card bg-gradient shadow">
          {/* ... (rest of the code remains unchanged) */}
        </Card>
      </div>
    );
  };

  // ... (rest of the code remains unchanged)
};

export default ManageTimesheets;
