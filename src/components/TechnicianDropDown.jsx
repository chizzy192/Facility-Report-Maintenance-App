import DropDown from "./DropDown"

function TechnicianDropDown({ technicians = [], onChange, value }) {
  // create display names that include category when present
  const options = technicians.map(t => ({
    ...t,
    full_name_display: `${t.full_name}${t.category ? ` (${t.category})` : ''}`
  }));

  const selectedTechnician = value ? options.find(tech => tech.user_id === value) : null;

  return (
    <DropDown
        value={selectedTechnician || null}
        onChange={(selectedTech) => {
          onChange && onChange(selectedTech); // Pass the entire technician object
        }}
        label="Technician *"
        name={selectedTechnician ? (selectedTechnician.full_name_display || selectedTechnician.full_name) : "Select a technician..."}
        listOptions={options}
    />
  )
}

export default TechnicianDropDown
