//
//  PushButtonView.swift
//  trees
//
//  Created by Gary Kertis on 8/24/15.
//  Copyright (c) 2015 Gary Kertis. All rights reserved.
//

import UIKit

class PushButtonView: UIButton {

    /*
    // Only override drawRect: if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func drawRect(rect: CGRect) {
        // Drawing code
    }
    */
    
    override func drawRect(rect: CGRect) {
        var path = UIBezierPath(ovalInRect: rect)
        UIColor.greenColor().setFill()
        path.fill()
    }

}
