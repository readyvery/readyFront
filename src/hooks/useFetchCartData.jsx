// 장바구니 확인
import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const useFetchCartData = (cartId) => {
  const token = localStorage.getItem("accessToken");
  
  const [cartIdApi, setCartIdApi] = useState(0);
  const [carts, setCarts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [inOut, setInOut] = useState(1);
  const [isOpened, setIsOpened] = useState(false);
  const [name, setName] = useState("");
  const [storeId, setStoreId] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = cartId
          ? `/order/cart?cartId=${cartId}`
          : `/order/cart`;
        const response = await commonApis.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCartIdApi(response.data.cartId);
        setCarts(response.data.carts);
        setEdit(response.data.edit);
        setImgUrl(response.data.imgUrl);
        setInOut(response.data.inOut);
        setIsOpened(response.data.isOpened);
        setName(response.data.name);
        setStoreId(response.data.storeId);
        setTotalPrice(response.data.totalPrice);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId]);

  return {
    cartIdApi,
    carts,
    edit,
    imgUrl,
    inOut,
    isOpened,
    name,
    storeId,
    totalPrice,
    setTotalPrice, // totalPrice 상태 업데이트 함수 추가
  };
};

export default useFetchCartData;
