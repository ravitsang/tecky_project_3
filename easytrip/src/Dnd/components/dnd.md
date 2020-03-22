    months.splice(4, 1, 'May');
    #replaces 1 element at index 4 with May

    months.splice(1, 0, 'Feb');
    #inserts at index 1 with Feb

    newList = { title: 'WED, MAR 25', items: ['1', '2', '3','4','5'] },
              { title: 'WED, MAR 26', items: ['6', '7', '8','9','10'] }

    newList[targetItem.grpI] = { title: 'WED, MAR 25', items: ['1', '2', '3','4','5'] } /
                               { title: 'WED, MAR 26', items: ['6', '7', '8','9','10'] }

    newList[targetItem.grpI].items = ['1', '2', '3','4','5'] /
                                     ['6', '7', '8','9','10']

    targetItem.itemI = target item index

    currentItem.itemI = current item index

    currentItem = newList[currentItem.grpI].items[currentItem.itemI]


    newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0] 
    # remove the old number and give the first number of the list