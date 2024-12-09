import { useFetchData } from '../../api/useFetchData';
import React, { useMemo, useState } from 'react';

function OrderHistory() {
    const { data: order, loading: orderLoading, error: orderError } = useFetchData('order-history');
    const { data: menuItem, loading: menuItemLoading, error: menuItemError } = useFetchData('menu-item-instance');
    const [menuItemComponent, setMenuItem] = useState(null);
    const [cashierName, setCashierName] = useState(null);
    let debounceTimer;
    const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000': import.meta.env.VITE_POS_API_BASE_URL;
    //const { data: menuItemComponent, loading: menuItemComponentLoading, error: menuItemComponentError } = useFetchData('menu-item');
    //const [menuItemId, setMenuItemId] = useState(null);

    const displayMenuItems = useMemo(() => {
        if (menuItemLoading) 
            return [];
        return menuItem;
    }, [menuItem, menuItemLoading]);

    const displayOrdersTable = useMemo(() => {
        if (orderLoading) 
            return [];
        return order;
        //.filter(id < 10);
        //.filter((id) => menuItem.image !== null);
    }, [order, orderLoading]);

    // const displayMenuItemComponents = useMemo(() => {
    //     if (menuItemComponentLoading) 
    //         return [];
    //     const menuItemComponentById = menuItemComponent.filter(item => item.id === menuItemId);
    //     return menuItemComponentById.length > 0 ? menuItemComponentById[0].name : "Item not found";
    //     //return menuItemComponent.filter(item => item.id === menuItemId).name;
    // }, [menuItemComponent, menuItemComponentLoading]);

    const handleDate = (date) => {
        let indexT = date.indexOf('T', 0);
        let orderDate = new Date(date.substring(0, indexT));
        let formattedDate = new Intl.DateTimeFormat('en-US').format(orderDate);
        return formattedDate;
    }

    const handleTime = (date) => {
        let indexT = date.indexOf('T', 0);
        let firstColon = date.indexOf(':', indexT);
        let secondColon = date.indexOf(':', firstColon + 1);
        let orderTime = date.substring(indexT + 1, secondColon);
        if(orderTime.substring(0, 2) == '00')
        {
            orderTime = "12" + orderTime.substring(2);
        }
        if(orderTime.substring(0, 1) == '0')
        {
            orderTime = orderTime.substring(1);
        }
        if(orderTime.substring(0,2) > 12)
        {
            let time = orderTime.substring(0, 2) - 12;
            orderTime = time + orderTime.substring(2) + " PM";
        }
        else
        {
            orderTime += " AM";
        }
        return orderTime;
    }

    const handleMenuItem = (id) => {
        fetch(`${baseUrl}/api/menu-item/${id}`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON from the response body
        })
        .then(data => {
            setMenuItem(data);
            return menuItemComponent;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error); // Handle error
        });
    }

    // const handleCashier = (id) => {
    //     const fetchPromises = id.map(id => {
    //         fetch(`${baseUrl}/api/cashier-name/${id}`)
    //         .then(response => {
    //             if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //             }
    //             return response.json(); // Parse JSON from the response body
    //         })
    //         .catch(error => {
    //             console.error('There was a problem with the fetch operation:', error); // Handle error
    //         });
    //     })};
    //     Promise.all(fetchPromises)
    //         .then(data => {
    //             data.forEach((cashier, index) => {
    //                 setCashierName(id[index]);
    //                 return cashierName;
    //             });
    //         })
    //         .catch(error => {
    //             console.error('There was a problem with the fetch operation:', error); // Handle error
    //         });

    return (
        <div className="">
            <h1 className="bg-black text-white p-6 mb-2 rounded-2xl font-bold text-4xl">ORDER HISTORY</h1>
            <table className="w-full center text-wrap justify-between bg-white">
                <tr className="text-white bg-black text-3xl"> 
                    <th className="">Order</th>
                    <th className="">Menu Item</th>
                    <th>Item Component</th>
                    <th>Price</th>
                    <th>Cashier ID</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
                {/*GET IT BY PAGES!!!!*/}
                {displayMenuItems.slice(0, 10).map((menuItems, i) => (
                    <React.Fragment key={i}>
                        {displayOrdersTable.slice(0, 10).map((orders, index) => (
                            <tr className="text-2xl text-black w-full justify-between border-collapse" key={orders.id}>
                                <td className="">{orders.id}</td>
                                <td className="">Bowl</td>
                                {/*handleMenuItem(menuItems.menu_item_id)}</td>*/}
                                <td className="">Orange Chicken, Chow Mein</td>
                                <td className=""> ${orders.price}</td>
                                <td className=""> {orders.cashier_id}
                                    {/*handleCashier(orders.cashier_id)*/}</td>
                                <td className="">{handleDate(orders.date)}</td>
                                <td className="">{handleTime(orders.date)}</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </table>
        </div>
    );
}
export default OrderHistory;