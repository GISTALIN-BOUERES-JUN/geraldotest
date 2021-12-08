import { Box, Flex, Heading, Button, Icon, Table, Thead, Th, Td, Tr, Checkbox, Tbody, Text, Input } from "@chakra-ui/react";
import { RiAddLine, RiDeleteBackLine, RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState, FormEvent } from "react";
import { Header } from "../components/Header";
import Modal from 'react-modal';
import { Sidebar } from "../components/Sidebar";
import { api } from "../services/api";




export default function UserList() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal () {
        setIsModalOpen(true);

    }

    function handleCloseModal () {
        setIsModalOpen(false)

    }
/*
useEffect(()=>{
    api.get('users')
    .then(users=> setUsersList(users))
},[]);
console.log(usersList);
*/



const [usersList, setUsersList] = useState([]);

/*
useEffect(()=>{
    fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data=> setUsersList(data.users))
},[])
*/

useEffect(()=>{
    api.get('users')
    .then(response=> setUsersList(response.data.users))
},[]);



    
    /*
    const { data, isLoading, error } = useQuery('emails', async () => {
        await api.get('emails')
    })
    console.log(data); */

const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
const [phoneNumber, setPhoneNumber] = useState('')

function handleCreateNewUser(event: FormEvent){
    event.preventDefault();

    const data = {
        firstName,
        lastName,
        email,
        phoneNumber,
    };

    /*
    const response = api.post('/users', data)
    console.log(response.data);
    */

    createNewUser(data);

    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    handleCloseModal();

}

async function createNewUser(data) {

    const response = await api.post('/users', {
        ...usersList, data
        
    })
    const { user } = response.data;

    setUsersList([
        ...usersList,
        data

    ]);
}

     function deleteUser() {

        
            api.delete('users')
            .then(response=> console.log(response))
        

}

    return (



        <Box>
            <Header />

            <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} overlayClassName="react-modal-overlay" className="react-modal_content"> 
            <Box flex="1" borderRadius={8} bg="gray.800" p="8" bg="#e7e9ee" alignContent="center">
            <Text fontSize="3xl" color="black">Create User</Text>
            <Input placeholder="First Name" mb="2" color="black" value={firstName} onChange={event=> setFirstName(event.target.value)} ></Input>
            <Input placeholder="Last Name" mb="2"color="black" value={lastName} onChange={event=> setLastName(event.target.value)} ></Input>
            <Input placeholder="E-Mail" mb="2" color="black" value={email} onChange={event=> setEmail(event.target.value)} ></Input>
            <Input placeholder="Phone Number" mb="4" color="black" value={phoneNumber} onChange={event=> setPhoneNumber(event.target.value)}></Input>
            <Button type="submit" colorScheme="pink" onClick={handleCreateNewUser}> Create New User </Button>

            </Box>
            </Modal>
            
         
            
            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Contacts</Heading>
                        <Button  onClick={handleOpenModal} size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine}  />}> Create New </Button>
                    </Flex>
                    
                    <Table colorScheme="WhiteAlpha">
                                    <Thead>
                                        <Tr>
                                            <Th px="6" color="gray.300" width="8">
                                                <Checkbox colorScheme="pink" />
                                            </Th>

                                            <Th>First Name</Th>
                                            <Th>Last Name</Th>
                                            <Th>E-mail</Th>
                                            <Th>Phone Number</Th>
                                            <Th width="8"></Th>
                                        </Tr>
                                    </Thead>
                                    
                                   <Tbody>
                                    { usersList.map (users => {
                                        return (
                                            <Tr key={users.id} >
                                            <Td px="6">
                                                <Checkbox colorScheme="pink" />
                                            </Td>
                                            <Td>                                     
                                                    <Text fontSize="sm" color="gray.300"> {users.firstName} </Text>
                                            </Td>
                                            <Td>                                     
                                                    <Text fontSize="sm" color="gray.300"> {users.lastName} </Text>
                                            </Td>
                                            <Td>                                     
                                                    <Text fontSize="sm" color="gray.300"> {users.email}</Text>
                                            </Td>
                                            <Td>                                     
                                                    <Text fontSize="sm" color="gray.300"> {users.phoneNumber} </Text>
                                            </Td>
                                            <Td>
                                                <Button onClick={deleteUser} size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiDeleteBinLine} />}> Delete </Button>
                                            </Td>
                                        </Tr>
                                        )
                                    })}

                                          
    
                                    </Tbody> 
                                </Table>
                   

                </Box>
            </Flex>

        </Box>
    );

}