
const getPermissions = (state) => {
    const { skincarePermissions, permissionFeched, PermissionsError} = state.entries;
    const glowPermissions = skincarePermissions?.find(
      (skincarePermission) => skincarePermission.areaId === 9
    );
    const view =
      glowPermissions?.levelId === 2 ||
      glowPermissions?.levelId === 3 ||
      glowPermissions?.levelId === 4;
    const edit = glowPermissions?.levelId === 3 || glowPermissions?.levelId === 4;
    console.log( view,
      edit,
      permissionFeched);
    return {
        view,
        edit,
        permissionFeched, 
    }
}

export default getPermissions
