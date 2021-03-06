// es6 proxy를 사용하여 store의 field가 변경될 때 마다 event fire를 할 수 있다.
// ie 에서는 지원하지 않는다!

const createStore = mutationHandler => new Proxy({
    // 필요한 data field 설정
}, {
    set: (store, prop, value, receiver) => {
        // 필요한 동작 수행
        // receiver는 프록시 object 자체를 의미함
        // proxy는 true를 return 해야만 제대로 동작
        return true;
    }
    // 필요한 event handler 및 trap 설정
})

export default createStore;


// 예시
// 쇼핑사이트에서 '상품 리스트'와 '회원 정보'에 따라 렌더링 갱신이 필요할 경우
const createStore = (renderMerchandiseList, renderCustomerInfo) => new Proxy({
    merchandiseList: [],
    customerInfo: {}
}, {
    set: (store, prop, value) => {
        store[prop] = value;
        prop === 'merchandiseList' && renderMerchandiseList(store);
        prop === 'customerInfo' && renderCustomerInfo(store);
        return true;
    }
})

export default createStore;
