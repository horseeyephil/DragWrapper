const perimeterFinderUtility = children => Array.prototype.reduce.call( children, (accum, member)=>{
    console.log('one time ',member.offsetTop, member, 'furthestTop ', accum.furthestTop)

    if(!accum.furthestLeft) accum = {furthestLeft: accum, furthestTop: accum, furthestRight: accum, furthestBottom: accum }

    const left = accum.furthestLeft.offsetLeft < member.offsetLeft ? accum.furthestLeft : member
    const top = accum.furthestTop.offsetTop < member.offsetTop ? accum.furthestTop : member
    const right = accum.furthestRight.offsetLeft + accum.furthestRight.getBoundingClientRect().width > member.offsetLeft + member.getBoundingClientRect().width ? accum.furthestRight : member
    const bottom = accum.furthestBottom.offsetTop + accum.furthestBottom.getBoundingClientRect().height > member.offsetTop + member.getBoundingClientRect().height ? accum.furthestBottom : member

    return {furthestLeft: left, furthestTop: top, furthestRight: right, furthestBottom: bottom}

})

export default perimeterFinderUtility