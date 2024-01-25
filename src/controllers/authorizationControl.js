
export async function authorizeUser(req, res, next) {
    const listOfRoles = ['user', 'admin'];
  
    if (!listOfRoles.includes(req.user['rol'])) {
      return next(new Error('Not authorized'));
    }
  
    next();
  }
  
  export async function authorizeAdmin(req, res, next) {
    const listOfRoles = ['admin'];
  
    if (!listOfRoles.includes(req.user['rol'])) {
      return next(new Error('Not authorized'));
    }
  
    next();
  }
/*

  const listOfRolesForAdminContent = ['admin']

const listOfRolesForUserContent = ['user', 'admin']

export async function authorizeUser(req, res, next) {
  if (!listOfRolesForUserContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}

export async function authorizeAdmin(req, res, next) {
  if (!listOfRolesForAdminContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}  */