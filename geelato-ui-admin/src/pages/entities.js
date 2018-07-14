/**
 * 实体名称统一管理，避免手工编写时出错
 */
class Entities {
  constructor () {
    this.platform = {
      dev: {
        project: 'platform_dev_project',
        pageConfig: 'platform_page_config',
        demoEntity: 'platform_demo_entity'
      },
      common: {
        treeNode: 'platform_tree_node',
        dict: 'sys_dict'
      }
    }
    this.project = {
      projectInfo: 'prj_project_info',
      teammeber: 'prj_teammeber',
      task: 'prj_task',
      comment: 'prj_comment',
      attachment: 'prj_attachment'
    }
  }
}

let instance = new Entities()
export default instance
