function OrderHistory() {
    return (
        <div className="">
            <h1 className="bg-black text-white p-6 mb-2 rounded-2xl font-bold text-4xl"> ORDER HISTORY</h1>
            <table className="w-full center text-wrap justify-between bg-white">
                <tr className="text-black text-3xl"> 
                    <th className="">Order</th>
                    <th className="">Menu Item</th>
                    <th>Item Component</th>
                    <th>Price</th>
                    <th>Cashier Name</th>
                    <th>Date</th>
                </tr>
                <tr className="text-2xl text-black w-full border-collapse">
                    <td className="border-2 border-gray-400">1</td>
                    <td className="">Bowl</td>
                    <td className="">Orange Chicken, Chow Mein</td>
                    <td className="">$30</td>
                    <td className="">5</td>
                    <td className="">11/29/2024</td>
                </tr>
            </table>
        </div>
    );
}

export default OrderHistory;