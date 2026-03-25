import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const OrderCard = ({userOrder}) => {
    const navigate = useNavigate()


  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="w-full">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => navigate(-1)} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold">My Orders</h1>
        </div>

        {userOrder?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders found</p>
            <Button onClick={() => navigate('/products')} className="mt-4 bg-pink-600 hover:bg-pink-700">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {userOrder?.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden"
              >
                {/* Order header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h2 className="text-sm md:text-lg font-semibold">
                      Order ID: {" "}
                      <span className="text-gray-600 font-mono text-xs md:text-sm">{order._id}</span>
                    </h2>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-600">
                        Amount: {" "}
                        <span className="font-bold text-green-600">
                          {order.currency} {order.amount?.toFixed(2) || '0.00'}
                        </span>
                      </p>
                      <span
                        className={`text-white px-2 py-1 rounded text-xs font-medium
                          ${order.status === "Paid"
                            ? "bg-green-500"
                            : order.status === "Failed"
                              ? "bg-red-500"
                              : "bg-orange-400"
                          }
                        `}
                      >
                        {order.status || 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User info */}
                <div className="px-4 py-3 bg-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Customer:</span> {order.user?.firstName || "Unknown"} {order.user?.lastName || ""}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Email:</span> {order.user?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="px-4 py-3">
                  <h3 className="font-medium mb-3 text-sm md:text-base">Products</h3>
                  <div className="space-y-3">
                    {order.products?.map((product, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <img
                          onClick={() => navigate(`/products/${product?.productId?._id}`)}
                          src={product.productId?.productimg?.[0]?.url || '/placeholder.jpg'}
                          alt={product.productId?.productName || 'Product'}
                          className="w-12 h-12 md:w-16 md:h-16 object-cover rounded cursor-pointer flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm md:text-base line-clamp-2 cursor-pointer hover:text-pink-600"
                             onClick={() => navigate(`/products/${product?.productId?._id}`)}>
                            {product.productId?.productName || 'Unknown Product'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            ID: {product?.productId?._id?.slice(-8) || 'N/A'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm md:text-base">
                            ₹{product.productId?.productPrice || 0} × {product.quantity || 1}
                          </p>
                          <p className="text-green-600 font-semibold text-sm">
                            ₹{(product.productId?.productPrice || 0) * (product.quantity || 1)}
                          </p>
                        </div>
                      </div>
                    )) || (
                      <p className="text-gray-500 text-sm">No products in this order</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default OrderCard
