const getComponentData = (state) => {
  const { skincarePermissions, permissionFeched, PermissionsError} = state.entries;
  const { products } = state.products;
  const glowPermissions = skincarePermissions?.find(
    (skincarePermission) => skincarePermission.areaId === 4
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
    products
  };
};

export default getComponentData;
