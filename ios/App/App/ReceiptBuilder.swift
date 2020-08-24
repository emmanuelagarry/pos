//
//  ReceiptBuilder.swift
//  App
//
//  Created by Emmanuel Agarry on 15/03/2020.
//

import Foundation

public class ReceiptBuilder{
    
    static func createMenuItemsTextReceiptCommands(arrayFromjs: [String]) -> Data{
        
         let image = UIImage(named: "logo.jpg")
        let commands: Data
        let builder: ISCBBuilder = StarIoExt.createCommandBuilder(.starLine)
        
        
        var newArry = arrayFromjs
        
        let cahInfo = newArry.removeFirst()
        let header = newArry.removeFirst()
        let payMentAndDelivery = newArry.removeLast()
        let footer = newArry.removeLast()
        let cahInfoArray = cahInfo.components(separatedBy: ";")
        let headerArray = header.components(separatedBy: ";")
        let payMentAndDiliveryArray = payMentAndDelivery.components(separatedBy: "+")
        let footerArray = footer.components(separatedBy: ";")
        
        builder.beginDocument()
        
        
        //        sooyah bistro logo
        builder.appendBitmap(image, diffusion: true, rotation: .normal)
        
        
//       Top part of receipt. Containg seller details , date and  order id
        builder.appendLineFeed(1)
        builder.appendData(withAlignment: Data(cahInfoArray[0].utf8), position: .left)
        builder.appendLineFeed(1)
        

//        builder.appendBitmap(withAbsolutePosition: image, diffusion: true, position: 8)

//        Top part of receipt. Containg seller details , date and  order id contn'd
        builder.appendData(withAlignment: Data(cahInfoArray[1].utf8), position: .left)
        builder.appendLineFeed(1)
        builder.appendData(withAlignment: Data(cahInfoArray[2].utf8), position: .left)
        builder.appendLineFeed(1)
        builder.appendData(withAlignment: Data(cahInfoArray[3].utf8), position: .left)
        builder.appendLineFeed(1)
        
//        contains payment type and delivery type
        builder.appendData(withAlignment: Data("Payment: ".utf8),
                           position: .left)
        builder.appendData(withAlignment: Data(payMentAndDiliveryArray[0].utf8),
                           position: .left)
        
        builder.appendData(withAlignment: Data("  Delivery: ".utf8),
                           position: .right)
        
        builder.appendData(withAlignment: Data(payMentAndDiliveryArray[1].utf8),
                           position: .right)
          builder.appendLineFeed(2)
//        sooyab bistro text and email
        
        builder.appendData(withAlignment: Data("SOOYAH BISTRO".utf8), position: .left)
         builder.appendLineFeed()
        builder.appendData(withAlignment: Data("info@sooyahbistro.com".utf8), position: .left)
        
         builder.appendLineFeed()
        
//        receipt Table headers
        
        builder.appendData(withAlignment: Data(headerArray[0].utf8), position: .left )
        builder.appendData(withAlignment: Data(headerArray[1].utf8), position: .center)
        builder.appendData(withAlignment: Data(headerArray[2].utf8), position: .right)
    
        builder.appendLineFeed()
        
        
//        receipt table cell data
        
        for list in newArry {
            let item = list.components(separatedBy: ";")
            builder.appendData(withAlignment: Data(item[0].utf8), position: .left)
            builder.appendData(withAlignment:Data(item[1].utf8), position: .center)
            builder.appendData(withAlignment: Data(item[2].utf8), position: .right)
            builder.appendLineFeed(1)
        }
        
        builder.appendLineFeed(1)
   
        
//        Tender, discount ,total ,change
        builder.appendData(withAlignment:Data(footerArray[0].utf8), position: .center)
        builder.appendData(withAlignment: Data(footerArray[1].utf8), position: .right)
        builder.appendLineFeed(1)
        builder.appendData(withAlignment:Data(footerArray[2].utf8), position: .center)
        builder.appendData(withAlignment: Data(footerArray[3].utf8), position: .right)
        builder.appendLineFeed(1)
        builder.appendData(withAlignment:Data(footerArray[4].utf8), position: .left)
        builder.appendData(withAlignment: Data(footerArray[5].utf8), position: .right)
        builder.appendLineFeed(1)
        builder.appendData(withAlignment:Data(footerArray[6].utf8), position: .left)
        builder.appendData(withAlignment: Data(footerArray[7].utf8), position: .right)
        
        
//        thank you message
         builder.appendLineFeed(2)
        builder.appendData(withAlignment: Data("Thank you for choosing Sooyah Bistro".utf8), position: .left)
        
        
        
        builder.appendCutPaper(SCBCutPaperAction.partialCutWithFeed)
        builder.endDocument()
        commands = builder.commands.copy() as! Data
        
        return commands
        
    }
    
    static func logoBuilder() -> Data{
        
        let image = UIImage(named: "logo.jpg")
        let commands: Data
        let builder: ISCBBuilder = StarIoExt.createCommandBuilder(.starLine)
        builder.beginDocument()
        builder.appendBitmap(image, diffusion: true, rotation: .normal)

        builder.appendCutPaper(SCBCutPaperAction.partialCutWithFeed)
        builder.endDocument()
        commands = builder.commands.copy() as! Data
        return commands
    }
}
