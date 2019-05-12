import { Expr, Callable } from 'tuber'

export default (context, inject) => {
  inject('restoreLines', items => {
    console.log(items)
    return items.map(item => {
      switch (item.type) {
        case 'EvalSequence':
          return {
            ...item,
            sequence: item.sequence.map(archive => Expr.restore(archive))
          }

        case 'Defined':
        case 'Found':
          return {
            ...item,
            body: Callable.restore(item.body)
          }

        case 'Deleted':
        case 'Undefined':
        case 'Void':
        case 'ParseError':
          return item
      }
    })
  })
}
