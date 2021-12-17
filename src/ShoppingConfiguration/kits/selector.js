const getComponentData = (state) => {
  const { skincarePermissions, permissionFeched, PermissionsError} = state.entries;
  const glowPermissions = skincarePermissions?.find(
    (skincarePermission) => skincarePermission.areaId === 7
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
