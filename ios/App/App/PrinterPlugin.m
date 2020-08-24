//
//  PrinterPlugin.m
//  App
//
//  Created by Emmanuel Agarry on 29/05/2020.
//


#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(PrinterPlugin, "PrinterPlugin",
           CAP_PLUGIN_METHOD(print, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(printDocumentForBoysJoor, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(testArray, CAPPluginReturnPromise);
           )

