//
//  PrinterPlugin.swift
//  App
//
//  Created by Emmanuel Agarry on 29/05/2020.
//

import Foundation





import CoreBluetooth

import Capacitor


@objc(PrinterPlugin)
public class PrinterPlugin: CAPPlugin {
    var port = ""
    var mac = ""
    var model = ""
    
    var myPortName = ""
    
    func asImage() -> UIImage {
        
       
        if #available(iOS 10.0, *) {
            

            let renderer = UIGraphicsImageRenderer(bounds: self.bridge.viewController.view.bounds)
            return renderer.image { rendererContext in
               self.bridge.viewController.view.layer.render(in: rendererContext.cgContext)
            }
        } else {
            UIGraphicsBeginImageContext(self.bridge.viewController.view.frame.size)
            self.bridge.viewController.view.layer.render(in:UIGraphicsGetCurrentContext()!)
            let image = UIGraphicsGetImageFromCurrentImageContext()
            UIGraphicsEndImageContext()
            return UIImage(cgImage: image!.cgImage!)
        }
    }
  
    
    
    
     @objc func print(_ call: CAPPluginCall){
        //
        var searchPrinterResult: [PortInfo]? = nil

        do {
            searchPrinterResult =  try SMPort.searchPrinter(target:"ALL:") as? [PortInfo]
        } catch {
            // Some error occurred.
          call.reject("some error occured")

            //            someText.text = "some error occured"
        }

        guard let portInfoArray: [PortInfo] = searchPrinterResult else {
            return
        }



        for portInfo: PortInfo in portInfoArray {
            myPortName = portInfo.portName
            port = port + "Port Name: \(portInfo.portName ?? "")"
                + "MAC Address: \(portInfo.macAddress ?? "")"
                + "Model Name: \(portInfo.modelName ?? "") \n"
        }

        call.success([
            "printer": "\(myPortName), ...... \(port)"
            ])
    }
    
    
    
    
    
     func storeImageToDocumentDirectory(image: UIImage, fileName: String) -> URL? {
        guard let data = image.pngData() else {
            return nil
        }
        let fileURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        do {
            try data.write(to: fileURL)
            return fileURL
        } catch {
            return nil
        }
    }
    
    
  @objc func printDocumentForBoysJoor(_ call: CAPPluginCall){
    
//        let commands: Data
//        let builder: ISCBBuilder = StarIoExt.createCommandBuilder(.starLine)
//        builder.beginDocument()
////        builder.appendRawData(pdfData as Data)
////        builder.appendBitmap(img, diffusion: true, rotation: .normal)
//        builder.appendData(withAlignment: Data("If i work . i am good to go!!!!".utf8), position: .left)
////        builder.appendRawData(Data(["name": "stre", "name": "dkdkd"].utf))
//        builder.appendCutPaper(SCBCutPaperAction.partialCutWithFeed)
//        builder.endDocument()
//        commands = builder.commands.copy() as! Data
    
    
    let theArrayfromJs =   call.getArray("menuItem", String.self)
    
//    let logo = call.getString("logo")
    


    let commands: Data
    commands = ReceiptBuilder.createMenuItemsTextReceiptCommands(arrayFromjs: theArrayfromJs!)
    
    

    
        var commandsArray: [UInt8] = [UInt8](repeating: 0, count: commands.count)
        
        commands.copyBytes(to: &commandsArray, count: commands.count)
        
        while true {
            var port : SMPort
            
            do {
                
                
                port = try SMPort.getPort(portName: "BT:Star Micronics", portSettings: "", ioTimeoutMillis: 10000)
                
                defer {
                    // Close port
                    
                    SMPort.release(port)
                }
                
                var printerStatus: StarPrinterStatus_2 = StarPrinterStatus_2()
                
                try port.beginCheckedBlock(starPrinterStatus: &printerStatus, level: 2)
                
                if printerStatus.offline == 1 {
                    break    // The printer is offline.
                }
                
                var total: UInt32 = 0
                
                while total < UInt32(commands.count) {
                    var written: UInt32 = 0
                    
                    // Send print data
                    try port.write(writeBuffer: commandsArray, offset: total, size: UInt32(commands.count) - total, numberOfBytesWritten: &written)
                    
                    total += written
                }
                
                
                try port.endCheckedBlock(starPrinterStatus: &printerStatus, level: 2)
                
                if printerStatus.offline == 1 {
                    break    // The printer is offline.
                }
                
                // Success
                break
            }
            catch let error as NSError {
                call.reject("\(error)")
                //                someText.text = error.userInfo.description
                break    // Some error occurred.
            }
        }
    
        
        
        
    }
    
  
    
    
    @objc  func testArray(_ call: CAPPluginCall){
    
    let theArrayfromJs =   call.getArray("menuItem", String.self)
        let first = theArrayfromJs![0]
        
        call.success(["first": first])
    }
    
    
    
}
