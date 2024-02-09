import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";

export const getProdListCookie = () => {
  if (hasCookie("prodList")) {
    const cookieProdList = JSON.parse(
      (getCookie("prodList") as string) ?? "{}"
    );
    return cookieProdList;
  }
  return {};
};

export function setProdListCookie(id: string, quantity: number) {

  const cookieProdList = getProdListCookie();
  if (id !== '') {
    if (quantity) {
       cookieProdList[id] = quantity
    } else {
       if (cookieProdList[id]) {
         cookieProdList[id] += 1;
       } else {
         cookieProdList[id] = 1;
       }
    }
    
     setCookie("prodList", JSON.stringify(cookieProdList));
  }
 
}

export function removeProductFromList(id: string) {
  const cookieProdList = getProdListCookie();
  if (cookieProdList[id]) {
    delete cookieProdList[id];
  }
  setCookie("prodList", JSON.stringify(cookieProdList));
}

export function removeOneItemFromList(id: string) {
  const cookieProdList = getProdListCookie();
  cookieProdList[id] -= 1;
  if (cookieProdList[id] === 0) {
    delete cookieProdList[id];

    
  }
  setCookie("prodList", JSON.stringify(cookieProdList));
}

export function setCidCookie(id: string) {
  const newCookie = {
    cid: id
  };
  setCookie("cid", JSON.stringify(newCookie));
}

export function clearCookies() {
  deleteCookie('cid')
  deleteCookie("prodList");
}
