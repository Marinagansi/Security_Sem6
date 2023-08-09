import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../../component/Admin/DashboardHeader';
import {calculateRange, sliceData} from '../../../utils/table-pagination';
import '../styles.css';

import Users from './Userservices';

import SideBar from '../../../component/Admin/Sidebar';
import sidebar_menu from '../../../component/Admin/constants/sidebar-menu';

const User=()=>{
    const [search, setSearch] = useState('');
    //const [orders, setOrders] = useState(all_orders);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        Users.getAll().
        then(response=>{
            setPagination(calculateRange(response.data.data, 5));
         setOrders(sliceData(response.data.data, page, 5));
            //setOrders(response.data.data);
            console.log(response.data)
        }).catch(err=>console.log(err))
        
    }, []);

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = orders.filter((item) =>
                item.fname.toLowerCase().includes(search.toLowerCase()) ||
                item.lname.toLowerCase().includes(search.toLowerCase()) ||
                item.username.toLowerCase().includes(search.toLowerCase())
            );
            setOrders(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        Users.getAll().then(response=>{
            setPagination(calculateRange(response.data.data, 5));
         setOrders(sliceData(response.data.data, page, 5));
            //setOrders(response.data.data);
            console.log(response.data)
        }).catch(err=>console.log(err))
        // setOrders(sliceData(orders, new_page, 5));
    }

    return(
        <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
        <div className='dashboard-content'>
        <DashboardHeader
                btnText="n" />
                <h5 style={{"fontSize":"1rem","marginLeft":"30px"}}>Users details</h5>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    {/* <h2>Users</h2> */}
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>ID</th>
                        <th>Email</th>
                      
                       
                        <th>Full Name</th>
                        {/* <th>Username</th> */}
                        {/* <th>Edit</th> */}
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order._id}</span></td>
                                    <td><span>{order.email}</span></td>
                                   
                                    <td>
                                        <div>
                                            {/* <img 
                                                src={"http://localhost:3000" + order.image}
                                                className='dashboard-content-avatar'
                                                alt={order.fname + ' ' +order.lname} /> */}
                                            <span>{order.name}</span>
                                        </div>
                                    </td>
                                    <td><span>{order.username}</span></td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {orders.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
        </div>
    )
}

export default User;