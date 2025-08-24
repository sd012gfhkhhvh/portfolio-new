import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function getGitFileCreationDate(filePath: string): Promise<Date | null> {
  try {
    // Get the first commit that introduced this file
    const { stdout } = await execAsync(
      `git log --follow --format=%ai --reverse "${filePath}" | head -1`,
      { cwd: process.cwd() }
    )
    
    if (stdout.trim()) {
      return new Date(stdout.trim())
    }
  } catch (error) {
    console.warn(`Could not get Git creation date for ${filePath}:`, error)
  }
  
  return null
}

export async function getGitFileLastModified(filePath: string): Promise<Date | null> {
  try {
    const { stdout } = await execAsync(
      `git log -1 --format=%ai "${filePath}"`,
      { cwd: process.cwd() }
    )
    
    if (stdout.trim()) {
      return new Date(stdout.trim())
    }
  } catch (error) {
    console.warn(`Could not get Git modification date for ${filePath}:`, error)
  }
  
  return null
}
