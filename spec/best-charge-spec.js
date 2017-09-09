describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim();
    expect(summary).toEqual(expected)
  });
  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('should buildCartItems',() => {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartItems = buildCartItems(inputs,loadAllItems());
    let expectCartItems = [

      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18,

        },
        count: 1
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6,

        },
        count: 2
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8,
        },
        count: 1
      },
    ];

    expect(cartItems).toEqual(expectCartItems);
   });

   it('should buildReceiptItems' ,() => {
     let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
     let cartItems = buildCartItems(inputs, loadAllItems());
     let receiptItems = buildReceiptItems(cartItems, loadPromotions());
     let expectReceiptItems = [
       {
         cartItem: {
           item: {
             id: 'ITEM0001',
             name: '黄焖鸡',
             price: 18.00,
           },
           count: 1
         },
         subTotal: 18.00,
         saved: 9.00
       },
       {
         cartItem: {
           item: {
             id: 'ITEM0013',
             name: '肉夹馍',
             price: 6.00
           },
           count: 2
         },
         subTotal: 12.00,
         saved: 0.00
       },
       {
         cartItem: {
           item: {
             id:'ITEM0022',
             name: '凉皮',
             price: 8.00
           },
           count: 1
         },
         subTotal: 8.00,
         saved: 4.00
       }
     ];
     expect(receiptItems).toEqual(expectReceiptItems);
   });


  it('should buildReceipts' , () => {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartItems = buildCartItems(inputs, loadAllItems());
    let receiptItems = buildReceiptItems(cartItems,loadPromotions());

    let expectReceipts =
    {
      receiptItems:[ {
        cartItem: {
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1
        },
        subTotal: 18.00,
        saved: 9.00
      },
    {
      cartItem: {
        item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
        },
        count: 2
      },
        subTotal: 12.00,
        saved: 0.00
    },
    {
      cartItem: {
        item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
        },
        count: 1
      },
        subTotal: 8.00,
        saved: 4.00
    }
    ],
      total: 25.00,
      savedTotal: 13.00,
      promotionType : '指定菜品半价(黄焖鸡，凉皮)'
    };

    expect(buildReceipts(receiptItems)).toEqual(expectReceipts);
  });

  it('should buildReceiptText' ,() => {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let cartItems = buildCartItems(inputs, loadAllItems());
    let receiptItems = buildReceiptItems(cartItems,loadPromotions());
    let receipts = buildReceipts(receiptItems);
    let receiptText = buildReceiptText(receipts);

    let expectText = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`;
    expect(receiptText).toEqual(expectText);
  });
});
