const checkDuplicateClient = ({ name, surname, existingClients }) => {
  const checkedFullName = `${name.trim()} ${surname.trim()}`.toLowerCase();
  const duplicateClient = existingClients.find(client => (`${client.name} ${client.surname}`.toLowerCase() === checkedFullName));
  if(duplicateClient) {
    return true;
  }
  return false;
} 

export default checkDuplicateClient;