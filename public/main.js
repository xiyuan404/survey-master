const style = { color: '#eee', border: '1px solid cyan', margin: '5px' }

const vDOM = {
  type: 'div',
  key: 'A',
  props: {
    style,
    children: [
      { type: 'div', key: 'B1', props: { style, children: [] } },
      { type: 'div', key: 'B2', props: { style, children: [] } },
    ],
  },
}

let workInProgress
const TAG_ROOT = 'TAG_ROOT'
const TAG_HOST = 'HOST_NODE'
const Placement = 'Placement'
const rootFiber = {
  tag: TAG_ROOT, // fiber类型
  key: 'ROOT', // fiberNode 标识
  stateNode: document.getElementById('root'), // 原生DOM节点
  props: { children: [vDOM] },
}

workInProgress = rootFiber
workLoop()
function workLoop(deadline) {
  while (workInProgress) {
    //如果如任务就执行
    // 返回下一个要执行的任务
    workInProgress = performUnitOfWork(workInProgress)
  }
  commitEffect(rootFiber)
}

function commitEffect(rootFiber) {
  let currEffect = rootFiber.fistEffect
  while (currEffect) {
    switch (currEffect.flags) {
      case Placement:
        commitPlacement(currEffect)
        break
    }
    currEffect = currEffect.nextEffect
  }
}

function commitPlacement(currEffect) {
  let parent = currEffect.return.stateNode
  debugger
  parent.appendChild(currEffect.stateNode)
}

function performUnitOfWork(workInProgress) {
  beginWork(workInProgress)
  if (workInProgress.child) {
    return workInProgress.child // 有太子返回太子
  }
  while (workInProgress) {
    completeUnitOfWork(workInProgress)
    if (workInProgress.sibling) {
      return workInProgress.sibling
    }
    workInProgress = workInProgress.return
    // 没有弟弟找叔叔
    // 如果没有父亲,构建过程结束
  }
}

/**
 * 根据当前的fiberNode和childrenFiber构建出子fiberTree(一层)
 * @param {*} workInProgress
 * @returns
 */

function beginWork(workInProgress) {
  console.log('beginWork', workInProgress.key)
  const children = workInProgress.props.children
  return reconcileChildren(workInProgress, children)
}
/**
 * 构建fiber子树
 * @param {*} returnFiber
 * @param {*} nextChildren
 */
function reconcileChildren(returnFiber, nextChildren) {
  let prevChildFiber // 上一个Fiber
  let firstChildFiber // return Fiber的first child

  for (let currIdx = 0; currIdx < nextChildren.length; currIdx++) {
    const currFiber = createFiber(nextChildren[currIdx])
    currFiber.flags = Placement
    currFiber.return = returnFiber
    if (!firstChildFiber) {
      firstChildFiber = currFiber
    } else {
      prevChildFiber.sibling = currFiber
    }
    prevChildFiber = currFiber
  }
  returnFiber.child = firstChildFiber
  return firstChildFiber
}
function createFiber(vnode) {
  return {
    tag: TAG_HOST,
    type: vnode.type,
    key: vnode.key,
    props: vnode.props,
  }
}

function completeUnitOfWork(fiber) {
  console.log('completeUnitOfWork', fiber.key)
  switch (fiber.tag) {
    case TAG_HOST:
      fiber.stateNode = document.createElement(fiber.type)

      break
  }
  makeEffectList(fiber)
}

function makeEffectList(completedWork) {
  const returnFiber = completedWork.return
  if (returnFiber) {
    if (!returnFiber.fistEffect) {
      //父亲为空就指向儿子的子链表
      returnFiber.fistEffect = completedWork.fistEffect
    }

    if (completedWork.lastEffect) {
      //父亲非空就父亲老尾下一个指向儿子子链表头,父亲尾指出儿子子链表头
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completedWork.fistEffect
      }
      returnFiber.lastEffect = completedWork.lastEffect //如果父亲有尾，尾巴下一个指向自己
    }

    if (completedWork.flags) {
      if (returnFiber.lastEffect) {
        //如果父亲有尾，尾巴下一个指向自己
        returnFiber.lastEffect.nextEffect = completedWork
      } else {
        //如果父亲没有尾，父亲的头指向自己
        returnFiber.fistEffect = completedWork
      }
      returnFiber.lastEffect = completedWork
    }
  }
}
