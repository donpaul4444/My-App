const orders = [
  { id: 1, customer: "Arun", amount: 1200, status: "completed" },
  { id: 2, customer: "Meera", amount: 2500, status: "pending" },
  { id: 3, customer: "Rahul", amount: 1800, status: "completed" },
  { id: 4, customer: "Anu", amount: 900, status: "cancelled" },
  { id: 5, customer: "Sara", amount: 3200, status: "completed" }
];

const totalRevenue=orders.filter((val)=>val.status=="completed").reduce((acc,val)=>{return val.amount+acc},0)
console.log(totalRevenue);
