const getComponentData = (state) => {
  const { skincarePermissions, permissionFeched, PermissionsError} = state.entries;
  // areaId will be changed when we have areaId for catagories
  const glowPermissions = skincarePermissions?.find(
    (skincarePermission) => skincarePermission.areaId === 3
  );
  const view =
    glowPermissions?.levelId === 2 ||
    glowPermissions?.levelId === 3 ||
    glowPermissions?.levelId === 4;
  const edit = glowPermissions?.levelId === 3 || glowPermissions?.levelId === 4;

  return {
    view,
    edit,
    permissionFeched,
    PermissionsError,
  };
};

export default getComponentData;
